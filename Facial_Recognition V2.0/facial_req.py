#! /usr/bin/python

# import the necessary packages
from imutils.video import VideoStream
from imutils.video import FPS
import face_recognition
import imutils
import pickle
import time
import cv2
#import connectAWSPost
import RPi.GPIO as GPIO

Buzzer_pin = 24

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(Buzzer_pin, GPIO.OUT)



#Initialize 'currentname' to trigger only when a new person is identified.
currentname = "unknown"
#Determine faces from encodings.pickle file model created from train_model.py
encodingsP = "encodings.pickle"

# load the known faces and embeddings along with OpenCV's Haar
# cascade for face detection
print("[INFO] loading encodings + face detector...")
data = pickle.loads(open(encodingsP, "rb").read())

# initialize the video stream and allow the camera sensor to warm up
# Set the ser to the followng
# src = 0 : for the build in single web cam, could be your laptop webcam
# src = 2 : I had to set it to 2 inorder to use the USB webcam attached to my laptop
#vs = VideoStream(src=2,framerate=10).start()
vs = VideoStream(usePiCamera=True).start()
time.sleep(2.0)

# start the FPS counter
fps = FPS().start()

# loop over frames from the video file stream
while True:
	# grab the frame from the threaded video stream and resize it
	# to 500px (to speedup processing)
	frame = vs.read()
	frame = imutils.resize(frame, width=600)
	# Detect the fce boxes
	boxes = face_recognition.face_locations(frame)
	# compute the facial embeddings for each face bounding box
	encodings = face_recognition.face_encodings(frame, boxes)
	names = []

	# loop over the facial embeddings
	for encoding in encodings:
		# attempt to match each face in the input image to our known
		# encodings
		matches = face_recognition.compare_faces(data["encodings"],
			encoding)
		name = "Unknown" #if face is not recognized, then print Unknown

		# check to see if we have found a match
		if True in matches:
			# find the indexes of all matched faces then initialize a
			# dictionary to count the total number of times each face
			# was matched
			matchedIdxs = [i for (i, b) in enumerate(matches) if b]
			counts = {}

			# loop over the matched indexes and maintain a count for
			# each recognized face face
			for i in matchedIdxs:
				name = data["names"][i]
				counts[name] = counts.get(name, 0) + 1

			# determine the recognized face with the largest number
			# of votes (note: in the event of an unlikely tie Python
			# will select first entry in the dictionary)
			name = max(counts, key=counts.get)

			#If someone in your dataset is identified, print their name on the screen
			if currentname != name:
				currentname = name
				print(currentname)
				############ SENT TO SERVER HERE #############
				#connectAWSPost.send_message()
				#aws_disconnect()
				for i in range(0, 4):
					for pulse in range(60):
						GPIO.output(Buzzer_pin, True)
						time.sleep(0.001)
						GPIO.output(Buzzer_pin, False)
						time.sleep(0.001)
					time.sleep(0.02)
                    #GPIO.cleanup()
				break
				


		# update the list of names
		names.append(name)
		fps.stop()
		cv2.destroyAllWindows()
		vs.stop()
