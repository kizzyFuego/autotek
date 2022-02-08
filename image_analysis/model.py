import numpy as np
import pandas as pd
import cv2
from tensorflow.keras.utils import to_categorical
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D
from pathlib import Path
from imgaug import augmenters as iaa
import matplotlib.image as mpimg
import random
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import os


symbols_images = {
    "Headlight Range Control": 0,
    "Automatic Gearbox": 1,
    "Engine Oil Pressure Light": 2,
    "Battery Light": 3,
    "Brake Light": 4,
    "Anti-lock Brake Light": 5,
    "Airbag And Seat Belt Light": 6,
    "Seat Belt Buckles": 7,
    "Engine Light": 8,
    "Boot Light": 9,
    "Tyre Pressure Light": 10,
    "Doors Opened Light": 11,
    "Engine Temperature Light": 12,
    "Low Fuel": 13,
    "Rear Fog Light": 14,
    "Steering Lock": 15,
    "Power Steering Warning Light": 16,
    "Brake Pad Light": 17,
    "Bonnet Light": 18,
    "Air Suspension": 19,
    "Adaptive Light": 20
}


def zoom(image_to_zoom):
    zoom_func = iaa.Affine(scale=(1, 1.3))
    z_image = zoom_func.augment_image(image_to_zoom)
    return z_image


def pan(image_to_pan):
    pan_func = iaa.Affine(translate_percent={"x": (-0.1, 0.1), "y": (-0.1, 0.1)})
    pan_image = pan_func.augment_image(image_to_pan)
    return pan_image


def img_random_brightness(image_to_brighten):
    bright_func = iaa.Multiply((0.2, 1.2))
    bright_image = bright_func.augment_image(image_to_brighten)
    return bright_image


def random_augment(image_to_augment, steering_angle):
    data_path = "/Users/kizzy/Desktop/SmartTechnologySD4_CA/dashApp/"
    os.chdir(data_path)
    augment_image = cv2.imread(image_to_augment)
    if np.random.rand() < 0.5:
        augment_image = zoom(augment_image)
    if np.random.rand() < 0.5:
        augment_image = pan(augment_image)
    if np.random.rand() < 0.5:
        augment_image = img_random_brightness(augment_image)
    return augment_image, steering_angle


def img_preprocess(img):
    #img = mpimg.imread(img)
    # Crop the image
    #img = img[60:135, :, :]
    # Convert color to yuv y-brightness, u,v chrominants(color)
    # Recommend in the NVIDIA paper
    #img = cv2.cvtColor(img, cv2.COLOR_RGB2YUV)
    # Apply Gaussian Blur
    # As suggested by NVIDIA paper
    #img = cv2.GaussianBlur(img, (3, 3), 0)
    img = cv2.resize(img, (64, 64))
    img = img / 255
    return img


def batch_generator(image_paths, labels_list, batch_size, is_training):
    batch_img = []
    labels = []
    for ii in range(len(image_paths)):
        for i in range(batch_size):
            print(f"batch {i}")
            # random_index = random.randint(0, len(image_paths) - 1)
            if is_training:
                im, label = random_augment(image_paths[ii], labels_list[ii])
            else:
                data_path = "/Users/kizzy/Desktop/SmartTechnologySD4_CA/dashApp/"
                os.chdir(data_path)
                im = cv2.imread(image_paths[ii])
                label = labels_list[ii]

            im = img_preprocess(im)
            batch_img.append(im)
            labels.append(label)
    return np.asarray(batch_img), np.asarray(labels)


def build_model():
    model = Sequential()
    model.add(Conv2D(64, (3, 3), padding='same', input_shape=(64, 64, 3), activation="relu"))
    model.add(Conv2D(64, (3, 3), activation="relu"))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Conv2D(64, (3, 3), padding='same', activation="relu"))
    model.add(Conv2D(64, (3, 3), activation="relu"))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Flatten())
    model.add(Dense(512, activation="relu"))
    model.add(Dropout(0.5))
    model.add(Dense(21, activation="softmax"))

    # Compile the model
    model.compile(
        loss='categorical_crossentropy',
        optimizer='adam',
        metrics=['accuracy']
    )
    return model


images = ["0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png",
          "12.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png", "19.png", "20.png"]
images = np.asarray(images)

image_labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
image_labels = np.asarray(image_labels)

x_train, y_train = batch_generator(images, image_labels, 250, 1)
print(f"Total Training Images: {len(x_train)}")
print(f"Total Training Labels: {len(y_train)}")
x_train, x_valid, y_train, y_valid = train_test_split(x_train, y_train, test_size=0.2, random_state=6)

#X_train, X_valid, y_train, y_valid = train_test_split(images, image_labels, test_size=0.2, random_state=6)
y_train = to_categorical(y_train, 21)
y_valid = to_categorical(y_valid, 21)

model = build_model()
print(model.summary())


h = model.fit(
    x_train,
    y_train,
    batch_size=64,
    epochs=10,
    validation_data=(x_valid, y_valid),
    shuffle=True,
    verbose=1,
)


#h = model.fit(batch_generator(X_train, y_train, 500, 1), steps_per_epoch=10,
 #             epochs=5,
  #            validation_data=batch_generator(X_valid, y_valid, 100, 0),
   #           validation_steps=10,
    #          verbose=1,
     #         shuffle=1)
plt.plot(h.history['loss'])
plt.plot(h.history['val_loss'])
plt.legend(['training', 'validation'])
plt.title('Loss')
plt.xlabel('Epoch')
plt.show()

model.save('dash_warning_model4.h5')
model.save_weights("dash_warning_weight4.h5")

# Testing
from keras.preprocessing import image as keras_image
test_image_dir = "/Users/kizzy/Desktop/SmartTechnologySD4_CA/dashApp/17.png"
img = keras_image.load_img(test_image_dir, target_size=(64, 64))
#img = img_preprocess(img)
image_array = keras_image.img_to_array(img)
image_array = image_array / 255
image_array = np.expand_dims(image_array, axis=0)
results = model.predict(image_array)

single_result = results[0]
most_likely_index = int(np.argmax(single_result))
class_likelyhood = single_result[most_likely_index]

print(f"Result = {most_likely_index}; Percent:{class_likelyhood}")