
# import the necessary packages
import RPi.GPIO as GPIO
import gpiozero
import dlib
import cv2
import imutils
from imutils.video import VideoStream
from imutils import face_utils
import numpy as np
import argparse
import time
import dlib
import requests


def euclidean_dist(ptA, ptB):
    # compute and return the euclidean distance between the two
    # points
    return np.linalg.norm(ptA - ptB)


def eye_aspect_ratio(eye):
    # compute the euclidean distances between the two sets of
    # vertical eye landmarks (x, y)-coordinates
    A = euclidean_dist(eye[1], eye[5])
    B = euclidean_dist(eye[2], eye[4])
    # compute the euclidean distance between the horizontal
    # eye landmark (x, y)-coordinates
    C = euclidean_dist(eye[0], eye[3])
    # compute the eye aspect ratio
    ear = (A + B) / (2.0 * C)
    # return the eye aspect ratio
    return ear



Buzzer_pin = 24
LED_pin = 23

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(Buzzer_pin, GPIO.OUT)
GPIO.setup(LED_pin,GPIO.OUT)

# define two constants, one for the eye aspect ratio to indicate
# blink and then a second constant for the number of consecutive
# frames the eye must be below the threshold for to set off the
# alarm
EYE_AR_THRESH = 0.3
EYE_AR_CONSEC_FRAMES = 16
#global COUNTER
global vs
# initialize the frame counter as well as a boolean used to
# indicate if the alarm is going off
COUNTER = 0
ALARM_ON = False

# load OpenCV's Haar cascade for face detection (which is faster than
# dlib's built-in HOG detector, but less accurate), then create the
# facial landmark predictor
print("[INFO] loading facial landmark predictor...")
detector = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

# grab the indexes of the facial landmarks for the left and
# right eye, respectively
(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]

# start the video stream thread
print("[INFO] starting video stream thread...")
# vs = VideoStream(src=0)
vs = VideoStream(usePiCamera=True).start()
time.sleep(1.0)

base_url = "http://ec2-34-224-65-150.compute-1.amazonaws.com"

result = requests.get(f"{base_url}/api/user/auth?user=user&password=password").json()

# loop over frames from the video stream
while drosiness_status:
	GPIO.output(LED_pin,GPIO.HIGH)
	# grab the frame from the threaded video file stream, resize
	# it, and convert it to grayscale
	# channels)
	#vs = VideoStream(src=0).start()
	frame = vs.read()
	frame = imutils.resize(frame, width=450)
	gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
	# detect faces in the grayscale frame
	rects = detector.detectMultiScale(gray, scaleFactor=1.1,
									  minNeighbors=5, minSize=(30, 30),
									  flags=cv2.CASCADE_SCALE_IMAGE)

	# loop over the face detections
	for (x, y, w, h) in rects:
		# construct a dlib rectangle object from the Haar cascade
		# bounding box
		rect = dlib.rectangle(int(x), int(y), int(x + w),
							  int(y + h))
		# determine the facial landmarks for the face region, then
		# convert the facial landmark (x, y)-coordinates to a NumPy
		# array
		shape = predictor(gray, rect)
		shape = face_utils.shape_to_np(shape)

		# extract the left and right eye coordinates, then use the
		# coordinates to compute the eye aspect ratio for both eyes
		leftEye = shape[lStart:lEnd]
		rightEye = shape[rStart:rEnd]
		leftEAR = eye_aspect_ratio(leftEye)
		rightEAR = eye_aspect_ratio(rightEye)
		# average the eye aspect ratio together for both eyes
		ear = (leftEAR + rightEAR) / 2.0

		# compute the convex hull for the left and right eye, then
		# visualize each of the eyes
		leftEyeHull = cv2.convexHull(leftEye)
		rightEyeHull = cv2.convexHull(rightEye)
		cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
		cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)

		# check to see if the eye aspect ratio is below the blink
		# threshold, and if so, increment the blink frame counter
		if ear < EYE_AR_THRESH:
			COUNTER += 1
			# if the eyes were closed for a sufficient number of
			# frames, then sound the alarm
			if COUNTER >= EYE_AR_CONSEC_FRAMES:
				for K in range(0, 4):
					for i in range(0, 4):
						for pulse in range(60):
							GPIO.output(Buzzer_pin, True)
							time.sleep(0.001)
							GPIO.output(Buzzer_pin, False)
							time.sleep(0.001)
						time.sleep(0.02)
					time.sleep(0.2)

		else:
			COUNTER = 0
			GPIO.output(Buzzer_pin, False)

	# if the `q` key was pressed, break from the loop
	if key == ord("q"):
		break
# do a bit of cleanup
cv2.destroyAllWindows()
vs.stop()
print ("LED off")
GPIO.output(LED_pin,GPIO.LOW)
