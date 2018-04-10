import numpy as np

mosquito = np.load("mosquito.npy", "r")
airplane = np.load("airplane.npy", "r")
bird = np.load("bird.npy", "r")
dragon = np.load("dragon.npy", "r")

print(mosquito.shape)
# print(mosquito[0][1000])

np.savetxt("mosquito.txt", mosquito[:1000][:], fmt="%s", delimiter=",")
np.savetxt("airplane.txt", mosquito[:1000][:], fmt="%s", delimiter=",")
np.savetxt("bird.txt", mosquito[:1000][:], fmt="%s", delimiter=",")
np.savetxt("dragon.txt", mosquito[:1000][:], fmt="%s", delimiter=",")