import numpy as np
import cv2


# NOTE: The below function is one method of analysing pattern in images.
# Other possible methods which can provide more accurate result is still being examined.

"""
Function analyze images using custom made templates for image matching.
It returns the index or name of the highest matching template.
note that the templates needs to be created first manually.
"""
def identify_symbol():

    # actual image name analysing
    frame = cv2.imread("real_image.jpg", 0)
    template_index = 0
    max_accuracy = 0
    # this assume that there are 5 templates images. Named 0.jpg, ... 4.jpg
    for i in range(5):
        template = cv2.imread(f'{i}.jpg', 0)
        result = cv2.matchTemplate(frame, template, cv2.TM_CCOEFF_NORMED)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
        if max_val > max_accuracy:
            max_accuracy = max_val
            template_index = i
    cv2.destroyAllWindows()
    return template_index

