var twist;
var manager;
var ros;
var batterySub;
var cmdVelPub;
var servo1Pub, servo2Pub, servo3Pub;
var servo1Val, servo2Val, servo3Val;
var servo1Last = 0, servo2Last = 0, servo3Last = 0;
var twistIntervalID;
var servoIntervalID;
var robot_hostname;
var batterySub;
var roverDataCounterSub;
var startPub;
var startVal;
var startIntervalID;
var sidPub;
var sidVal = null;
var sidIntervalID;
var linear_speed = 0.1;
var angular_speed = 0.2;

var max_linear_speed = 0.5;
var max_angular_speed = 1.2;

function initROS() {

    ros = new ROSLIB.Ros({
        url: "ws://" + robot_hostname + ":9090"
    });

    // Init message with zero values.
    twist = new ROSLIB.Message({
        linear: {                                                                   
            x: 0,
            y: 0,
            z: 0
        },
        angular: {
            x: 0,
            y: 0,
            z: 0
        }
    });

    cmdVelPub = new ROSLIB.Topic({
        ros: ros,
        name: 'cmd_vel',
        messageType: 'geometry_msgs/Twist',
        queue_size: 10
    });

    cmdVelPub.advertise();

    servo1Pub = new ROSLIB.Topic({
        ros: ros,
        name: 'servo1/angle',
        messageType: 'std_msgs/Int16',
        latch: true,
        queue_size: 5
    });

    servo2Pub = new ROSLIB.Topic({
        ros: ros,
        name: 'servo2/angle',
        messageType: 'std_msgs/Int16',
        latch: true,
        queue_size: 5
    });

    servo3Pub = new ROSLIB.Topic({
        ros: ros,
        name: 'servo3/angle',
        messageType: 'std_msgs/Int16',
        latch: true,
        queue_size: 5
    });

    servo1Pub.advertise();
    servo2Pub.advertise();
    servo3Pub.advertise();

    systemRebootPub = new ROSLIB.Topic({
        ros: ros,
        name: 'system/reboot',
        messageType: 'std_msgs/Empty'
    });
    systemRebootPub.advertise();

    systemShutdownPub = new ROSLIB.Topic({
        ros: ros,
        name: 'system/shutdown',
        messageType: 'std_msgs/Empty'
    });
    systemShutdownPub.advertise();

    batterySub = new ROSLIB.Topic({
        ros : ros,
        name : 'battery',
        messageType : 'std_msgs/Float32',
        queue_length: 1
    });
    batterySub.subscribe(batteryCallback);

    roverDataCounterSub = new ROSLIB.Topic({
        ros : ros,
        name : 'rover_data_counter',
        messageType : 'std_msgs/Int32',
        queue_length: 1
    });
    roverDataCounterSub.subscribe(roverDataCounterCallback);

    startPub = new ROSLIB.Topic({
        ros: ros,
        name: 'start_val',
        messageType: 'std_msgs/Int16',
        queue_size: 10
    });
   
    startPub.advertise();

    sidPub = new ROSLIB.Topic({
        ros: ros,
        name: 'sidewalk_id',
        messageType: 'std_msgs/String',
        queue_size: 10
    });
   
    sidPub.advertise();

}

  
function initSliders() {

    $('#s1-slider').slider({
        tooltip: 'show',
        min: -90,
        max: 90,
        step: 1,
        value: 0
    });
    $('#s1-slider').on("slide", function(slideEvt) {
        servo1Val = slideEvt.value;
    });

    $('#s2-slider').slider({
        tooltip: 'show',
        min: -90,
        max: 90,
        step: 1,
        value: 0
    });
    $('#s2-slider').on("slide", function(slideEvt) {
        servo2Val = slideEvt.value;
    });

    $('#s3-slider').slider({
        tooltip: 'show',
        min: -90,
        max: 90,
        step: 1,
        value: 0
    });
    $('#s3-slider').on("slide", function(slideEvt) {
        servo3Val = slideEvt.value;
    });
}

// joystick no longer being used
function createJoystick() {

    joystickContainer = document.getElementById('joystick');

    manager = nipplejs.create({
        zone: joystickContainer,
        position: { left: 65 + '%', top: 50 + '%' },
        mode: 'static',
        size: 400,
        color: '#ffffff',
        restJoystick: true
    });

    manager.on('move', function (evt, nipple) {

        var lin = Math.sin(nipple.angle.radian) * nipple.distance * 0.01;
        var ang = -Math.cos(nipple.angle.radian) * nipple.distance * 0.01;

        twist.linear.x = lin * max_linear_speed;
        twist.angular.z = ang * max_angular_speed;
    });

    manager.on('end', function () {
        twist.linear.x = 0
        twist.angular.z = 0
    });
}

function stopMove(){
    twist.linear.x = 0
    twist.angular.z = 0
}

function moveF(){
    stopMove()
    twist.linear.x = linear_speed
}

function moveB(){
    stopMove()
    twist.linear.x = -linear_speed
}

function moveL(){
    stopMove()
    twist.angular.z = angular_speed 
}

function moveR(){
    stopMove()
    twist.angular.z = -angular_speed 
}

function initTeleopKeyboard() {
    var body = document.getElementsByTagName('body')[0];
    body.addEventListener('keydown', function(e) {
        switch(e.keyCode) {
            case 37: //left
                twist.angular.z = max_angular_speed;
                break;
            case 39: //right
                twist.angular.z = -max_angular_speed;
                break;
            case 38: ///up
                twist.linear.x = max_linear_speed;
                break;
            case 40: //down
                twist.linear.x = -max_linear_speed;
        }
    });
    body.addEventListener('keyup', function(e) {
        switch(e.keyCode) {
            case 37: //left
            case 39: //right
                twist.angular.z = 0;
                break;
            case 38: ///up
            case 40: //down
                twist.linear.x = 0;
        }
    });
}

function batteryCallback(message) {
    document.getElementById('batteryID').innerHTML = 'Voltage: ' + message.data.toPrecision(4) + 'V';
}

function roverDataCounterCallback(message) {
    document.getElementById('roverDataCounterID').innerHTML = 'Rover Data: ' + message.data;
}

function publishTwist() {
    cmdVelPub.publish(twist);
}

function publishServos() {
    var servoMsg;

    if (servo1Val != servo1Last) {
        servo1Last = servo1Val;
        servoMsg = new ROSLIB.Message({
            data: servo1Val
        });
        servo1Pub.publish(servoMsg);
    }

    if (servo2Val != servo2Last) {
        servo2Last = servo2Val;
        servoMsg = new ROSLIB.Message({
            data: servo2Val
        });
        servo2Pub.publish(servoMsg);
    }

    if (servo3Val != servo3Last) {
        servo3Last = servo3Val;
        servoMsg = new ROSLIB.Message({
            data: servo3Val
        });
        servo3Pub.publish(servoMsg);
    }

}

function systemReboot(){
    systemRebootPub.publish(1)
    alertMessage = "Rebooting system"
    displayAlert(alertMessage)
}

function turnOff(){
    systemShutdownPub.publish()
    alertMessage = "Turning off Rover"
    displayAlert(alertMessage)
}

function publishStart(){
    var startMsg;
    startMsg = new ROSLIB.Message({
        data: startVal
    });
    startPub.publish(startMsg)
}

function setStart(){
    startVal = 99;
    // check if there is a id value
    if(checkSID()){
        alertMessage = `Started collecting data on ID ${sidVal}`;
        // disable: setIDButton, startButton
        disableButton('#setIDButton');
        disableButton('#startButton');
        // enable: stopButton
        enableButton('#stopButton');
        // display alert message to the user
        displayAlert(alertMessage);
    }
    else {
        alertMessage = 'Please enter an ID';
        displayAlert(alertMessage);
    }
};

function setStop(){
    startVal = 0;
    if(checkSID()){
        // disable: setStopButton
        disableButton("#stopButton");
        // enable: startButton, setIDButton
        enableButton("#startButton");
        enableButton("#setIDButton");

        alertMessage = `Stopped collecting data on ID: ${sidVal}.`
    }
    displayAlert(alertMessage);

}

function publishSID(){
    var sidMsg;
    sidMsg = new ROSLIB.Message({
        data: sidVal
    });
    sidPub.publish(sidMsg)
}

function setSID(){
    sidVal = document.getElementById("sid").value;
    if(checkSID()){
        alertMessage = `ID: ${sidVal} set.`;
    }
    else{
        alertMessage = `Please enter an ID.`
    }
    displayAlert(alertMessage)
}

// *** NEEDS WORK ***
// function to check if the SID is set.
    //  this needs some work because it's not checking if it's null
function checkSID() {
    if(sidVal && sidVal.length > 1) {
        return true
    }
    else{
        return false
    }
}

// disable the button passed to it.
const disableButton = (id)  => {
    $(id).prop("disabled", true);
};

// enables button passed to it
const enableButton = (id) => {
    $(id).prop("disabled", false);
};

// Function creates and displays a bootstrap alert message for the user. Auto-fades out after 2.5 seconds
function displayAlert(alertText) {

    // adding the bootstrap alert to the DOM
    var alertsColumn = document.getElementById("alerts")
    
    var alertDiv = document.createElement("div")
    var classATT = "alert alert-primary alert-dismissible fade show"
    var roleATT = "alert"
    alertDiv.setAttribute("class", classATT)
    alertDiv.setAttribute("role", roleATT)
    alertDiv.innerHTML = alertText

    var dismissButton = document.createElement("button")
    dismissButton.setAttribute("type", "button")
    dismissButton.setAttribute("class", "close")
    dismissButton.setAttribute("data-dismiss", "alert")
    dismissButton.setAttribute("aria-label", "Close")

    var spanElement = document.createElement("span")
    spanElement.setAttribute("aria-hidden", "true")
    spanElement.innerHTML = "&times;"

    
    dismissButton.appendChild(spanElement)
    alertDiv.appendChild(dismissButton)

    alertsColumn.appendChild(alertDiv)

    // fading out the alert after 2.5 seconds
    window.setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove(); 
        });
    }, 2500); 
}


window.onblur = function(){  
    twist.linear.x = 0;
    twist.angular.z = 0;
    publishTwist();             
  }  

function shutdown() {
    clearInterval(twistIntervalID);
    clearInterval(servoIntervalID);
    clearInterval(startIntervalID);
    clearInterval(sidIntervalID);
    cmdVelPub.unadvertise();
    servo1Pub.unadvertise();
    servo2Pub.unadvertise();
    servo3Pub.unadvertise();
    systemRebootPub.unadvertise();
    systemShutdownPub.unadvertise();
    batterySub.unsubscribe();
    startPub.unadvertise();
    sidPub.unadvertise();
    ros.close();
}

window.onload = function () {

    
    // disable the stopButton at the start
    disableButton('#stopButton');
    

    robot_hostname = location.hostname;

    initROS();
    initSliders();
    initTeleopKeyboard();
    createJoystick();

    video = document.getElementById('video');
    video.src = "http://" + robot_hostname + ":8080/stream?topic=/camera/image_raw&type=ros_compressed";
    
    twistIntervalID = setInterval(() => publishTwist(), 100); // 10 hz

    servoIntervalID = setInterval(() => publishServos(), 100); // 10 hz

    startIntervalID = setInterval(() => publishStart(), 1000); // 1 hz
    
    sidIntervalID = setInterval(() => publishSID(), 1000); // 1 hz

    window.addEventListener("beforeunload", () => shutdown());
}


