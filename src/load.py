try:
    import os
    import warnings
    import sys
    import numpy as np
    import pandas as pd
    from PIL import Image
    import laspy
    import shutil
    import tifffile
    
    def hillshade(array,azimuth,angle_altitude):
        azimuth = 360.0 - azimuth 
        x, y = np.gradient(array)
        slope = np.pi/2. - np.arctan(np.sqrt(x*x + y*y))
        aspect = np.arctan2(-x, y)
        azimuthrad = azimuth*np.pi/180.
        altituderad = angle_altitude*np.pi/180.
        shaded = np.sin(altituderad)*np.sin(slope) + np.cos(altituderad)*np.cos(slope)*np.cos((azimuthrad - np.pi/2.) - aspect)
        return 255*(shaded + 1)/2
    
    warnings.filterwarnings("ignore")
    try:
        shutil.rmtree("tmp")
    except:
        pass
    os.mkdir("tmp")
    inp = laspy.read(sys.argv[1])
    df = pd.DataFrame(columns=["x","y","z","class"])
    df["x"] = np.array(inp.x)
    df["y"] = np.array(inp.y)
    df["z"] = np.array(inp.z)
    df["class"] = np.array(inp.classification)
    df["voxel_x"] = (df["x"] - df["x"].min()) // 1
    df["voxel_y"] = (df["y"] - df["y"].min()) // 1
    df["z_mod"] = df["z"] - df["z"].min()
    df_stack = df.groupby(["voxel_x","voxel_y"]).agg({"z_mod":"min","class":"min"}).reset_index()
    img_z = df_stack.pivot("voxel_y","voxel_x","z_mod").values
    img_z = np.flip(img_z,0)
    for j in range(img_z.shape[0]):
        for k in range(img_z.shape[1]):
            t = 1
            while np.isnan(img_z[j][k]):
                j_l = j - t
                j_r = j + t
                k_l = k - t
                k_r = k + t
                if j_l < 0:
                    j_l = 0
                if k_l < 0:
                    k_l = 0
                img_z[j][k] = np.nanmean(img_z[j_l:j_r,k_l:k_r])
                t += 1
    img_z = (img_z-img_z.min())/(img_z.max()-img_z.min())*255
    hill = hillshade(img_z,30,30)
    hill = hill.astype("uint8")
    hill = np.stack((hill,hill,hill),axis=2)
    hill = Image.fromarray(hill)
    hill.save("tmp/dsm.png")
    tif = tifffile.imread(sys.argv[2])
    tif = tif.astype("uint8")
    tif = Image.fromarray(tif)
    tif = tif.resize((img_z.shape[1],img_z.shape[0]))
    tif.save("tmp/tif.png")
    df_sub = df_stack[df_stack["class"] == 2]
    img_z = df_sub.pivot("voxel_y","voxel_x","z_mod").values
    img_z = np.flip(img_z,0)
    for j in range(img_z.shape[0]):
        for k in range(img_z.shape[1]):
            t = 1
            while np.isnan(img_z[j][k]):
                j_l = j - t
                j_r = j + t
                k_l = k - t
                k_r = k + t
                if j_l < 0:
                    j_l = 0
                if k_l < 0:
                    k_l = 0
                img_z[j][k] = np.nanmean(img_z[j_l:j_r,k_l:k_r])
                t += 1
    img_z = (img_z-img_z.min())/(img_z.max()-img_z.min())*255
    hill = hillshade(img_z,30,30)
    hill = hill.astype("uint8")
    hill = np.stack((hill,hill,hill),axis=2)
    hill = Image.fromarray(hill)
    hill.save("tmp/dtm.png")
    df_stack["class"][df_stack["class"] != 2] = 0
    df_stack["class"][df_stack["class"] == 2] = 1
    img_class = df_stack.pivot("voxel_y","voxel_x","class").values
    img_class = np.flip(img_class,0)
    img = np.empty([img_z.shape[0],img_z.shape[1],3])
    for j in range(img_z.shape[0]):
        for k in range(img_z.shape[1]):
            if np.isnan(img_class[j][k]):
                img[j][k] = [0,0,0]
            elif img_class[j][k] == 0:
                img[j][k] = [128,128,128]
            else:
                img[j][k] = [255,165,0]
    img = img.astype("uint8")
    img = Image.fromarray(img)
    img.save("tmp/class.png")
    print("suc")
except:
    print("err")
