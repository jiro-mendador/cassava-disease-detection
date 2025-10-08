# to run with usb debugging on and phone connected on pc via cable, run this first on cmd:
adb reverse tcp:8081 tcp:8081 <!-- to be able to connect the phone in pc -->
adb reverse tcp:8080 tcp:8080 <!-- to be able to connect the phone in localhost backend -->

# download expo go first on phone

# run this command on vs code or any editor terminal:
npx expo start --host=localhost

# run this command on vs code or any editor terminal:
npx expo start --localhost --android

# exporting apk
npx eas build -p android --profile preview