from keras.preprocessing import image
from keras.applications.vgg16 import decode_predictions, preprocess_input, VGG16
from keras import backend as K
# from model import Model
from PIL import Image
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from skimage.transform import resize

K.clear_session()

def plot_map1(grads, im, predictions):
#     fig, axes = plt.subplots(1,2,figsize=(14,5))
    fig, ax = plt.subplots(figsize=(14,6))
    ax.imshow(im)
#     plt.imshow(im)
    i = ax.imshow(grads,cmap="jet",alpha=0.4)
#     fig.colorbar(i, ax=ax)
    plt.title("Pr(Category={}) = {:5.2f}".format(
                      predictions.loc[0,'category'].upper(),
                      predictions.loc[0,'probability']))
    plt.axis('off')
    plt.savefig('foo.png')
# plot_map(heatmap, org_img, predictions)

def plot_map(grads, im, predictions, f_name='foo.png', dpi=200, resize_fact=1):
#     fig, axes = plt.subplots(1,2,figsize=(14,5))
    fig = plt.figure(frameon=False)
    fig.set_size_inches(im.size[0]/dpi, im.size[1]/dpi)
    ax = plt.Axes(fig, [0., 0., 1., 1.])
    ax.set_axis_off()
    fig.add_axes(ax)

    ax.imshow(im)
#     plt.imshow(im)
    i = ax.imshow(grads,cmap="jet",alpha=0.4)
#     fig.colorbar(i, ax=ax)
    plt.title("Pr(Category={}) = {:5.2f}".format(
                      predictions.loc[0,'category'].upper(),
                      predictions.loc[0,'probability']))
    plt.axis('off')
    plt.savefig(f_name, dpi=(dpi * resize_fact))
    plt.close()


def cam(org_img, model=VGG16(weights='imagenet'), f_name='foo.png'):
    # model = VGG16(weights='imagenet')
    # org_img = Image.open(img_path)
    if org_img.mode != "RGB":
        org_img = org_img.convert("RGB")
    # img = preprocess_image(org_img, target_size=(224, 224))
    img = org_img.resize((224, 224))
    # img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    preds = model.predict(x)
    predictions = pd.DataFrame(decode_predictions(preds, top=3)[0],columns=['col1','category','probability']).iloc[:,1:]
    argmax = np.argmax(preds[0])
    output = model.output[:, argmax]
    last_conv_layer = model.get_layer('block5_conv3')
    grads = K.gradients(output, last_conv_layer.output)[0]
    pooled_grads = K.mean(grads, axis=(0, 1, 2))
    iterate = K.function([model.input], [pooled_grads, last_conv_layer.output[0]])
    pooled_grads_value, conv_layer_output_value = iterate([x])
    for i in range(512):
        conv_layer_output_value[:, :, i] *= pooled_grads_value[i]
    heatmap = np.mean(conv_layer_output_value, axis=-1)
    heatmap = np.maximum(heatmap, 0)
    heatmap /= np.max(heatmap)

    # org_img = Image.open(img_path)
    size = org_img.size
    heatmap = resize(heatmap, (size[1], size[0]))
    heatmap = np.uint8(255 * heatmap)
    plot_map(heatmap, org_img, predictions, f_name)

    return None

# model_vgg16 = Model('fine-tuned-vgg16',
#                     '../models/vgg16_model.h5',
#                     '../models/history_vgg16.json')

# cam('elephant.jpg', 'foo2.jpg')