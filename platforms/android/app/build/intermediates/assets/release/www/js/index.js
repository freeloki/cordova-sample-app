/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var fsInstance
var fileName
var fileDir
var entry;
var fileApiCallbacks = {

  onErrorLoadFs: function (err) {
    console.log('Error occured: ' + err.code)
    app.writeLog('Error occured: ', err.code)
  },

  onErrorCreateFile: function (err) {
    console.log('Error occured: ' + err.code)
    app.writeLog('Error occured: ', err.code)
    console.log("Remove failure:" + JSON.stringify(err))
  },

  onErrorReadFile: function (err) {
    console.log('Error occured: ' + err.code)
    app.writeLog('Error occured: ', err.code)
  },

  onErrorCreateDir: function (err) {
    console.log('Error occured: ' + err.code)
    app.writeLog('Error occured: ', err.code)
  }
}
var app = {
  // Application Constructor

  writeLog: function (msg, extra) {
    document.getElementById('logBox').innerHTML = msg + extra
  },

  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    document.getElementById('echoBtn').addEventListener('click', this.echoBtn)
    document.getElementById('getDeviceId').addEventListener('click', this.getDeviceId)
    document.getElementById('rebootDevice').addEventListener('click', this.rebootDevice)
    document.getElementById('getAfexSdkVersion').addEventListener('click', this.afexSdkVersion)
    document.getElementById('getAndroidSdkVersion').addEventListener('click',this.androidSdkVersion)
    document.getElementById('getFileSystem').addEventListener('click', this.getFileSystemEvent)
    document.getElementById('createFile').addEventListener('click', this.createFile)
    document.getElementById('deleteFile').addEventListener('click', this.deleteFile)
    document.getElementById('readFile').addEventListener('click', this.readFile)
    document.getElementById('makeDir').addEventListener('click', this.makeDir)
    document.getElementById('removeDir').addEventListener('click', this.removeDir)
    document.getElementById('moveFile').addEventListener('click', this.moveFile)
    document.getElementById('listFiles').addEventListener('click', this.listFiles)

  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    document.getElementById('selectCordovaDir').innerHTML += '<option value="' + cordova.file.externalApplicationStorageDirectory + '">External App Storage Directory</option>'
    document.getElementById('selectCordovaDir').innerHTML += '<option value="' + cordova.file.externalCacheDirectory + '">External App Cache Directory</option>'
    document.getElementById('selectCordovaDir').innerHTML += '<option value="' + cordova.file.externalDataDirectory + '">External Application Data Directory</option>'
    document.getElementById('selectCordovaDir').innerHTML += '<option value="' + cordova.file.externalRootDirectory + '">External Root Directory</option>'
    document.getElementById('selectCordovaDir').innerHTML += '<option value="' + cordova.file.dataDirectory + '">Application Data Directory</option>'
    document.getElementById('selectCordovaDir').innerHTML += '<option value="' + cordova.file.cacheDirectory + '">Application Cache Directory</option>'
    document.getElementById('selectCordovaDir').innerHTML += '<option value="' + cordova.file.applicationDirectory + '">Application Directory (Assets)</option>'
    document.getElementById('selectCordovaDir').innerHTML += '<option value="' + cordova.file.applicationStorageDirectory + '">Application Storage Directory</option>'
  },

  getFileSystemEvent: function () {

    var applicationStorageDir = document.getElementById('selectCordovaDir').value

    console.log('Get Fs clicked')
    console.log(applicationStorageDir)
    console.log(cordova.file)


  },

  writeFile: function (fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).

    console.log('writeFile clicked')

    fileEntry.createWriter(function (fileWriter) {

      fileWriter.onwriteend = function () {
        console.log('Successful file write...')
        document.getElementById('logBox').innerHTML += 'File write success: ' + fileName
        app.readFile(fileEntry)
      }

      fileWriter.onerror = function (e) {
        console.log('Failed file write: ' + e.toString())
      }

      // If data object is not passed in,
      // create a new Blob instead.
      if (!dataObj) {
        dataObj = new Blob(['some file data'], {
          type: 'text/plain'
        })
      }

      fileWriter.write(dataObj)
    })
  },

  makeDir: function () {

    console.log('makeDir clicked')


    fileName = document.getElementById('fileNameTxt').value
    var selectedDir = document.getElementById('selectCordovaDir').value

    console.log('file dir: ' + selectedDir)

    window.resolveLocalFileSystemURL(selectedDir, function (dirEntry) {
      console.log('file system open: ' + dirEntry.name)
      dirEntry.getDirectory(fileName, {
        create: true
      }, function (subddirEntry) {
        console.log('Directory created successfully.')
      }, fileApiCallbacks.onErrorCreateDir)
    }, fileApiCallbacks.onErrorLoadFs)
  },

  removeDir: function () {

    console.log('removeDir clicked')


    fileName = document.getElementById('fileNameTxt').value
    var selectedDir = document.getElementById('selectCordovaDir').value

    console.log('file dir: ' + selectedDir)

    window.resolveLocalFileSystemURL(selectedDir, function (dirEntry) {
      console.log('file system open: ' + dirEntry.name)
      dirEntry.getDirectory(fileName, {
        create: false
      }, function (subddirEntry) {

        subddirEntry.remove(function (entry) {

          console.log("Directory Remove success:" + entry)
        }, function failure(err) {
          console.log("Directory Remove failure:" + JSON.stringify(err))
        })
      }, fileApiCallbacks.onErrorCreateDir)
    }, fileApiCallbacks.onErrorLoadFs)
  },

  createFile: function () {
    fileName = document.getElementById('fileNameTxt').value

    console.log('Create File Clicked!. Filename: ' + fileName)

    var selectedDir = document.getElementById('selectCordovaDir').value

    console.log('Selected Dir:' + selectedDir)

    window.resolveLocalFileSystemURL(selectedDir, function (dirEntry) {
      console.log('File System open: ' + dirEntry.name)

      dirEntry.getFile(fileName, {
        create: true,
        exclusive: false
      }, function (fileEntry) {
        //app.writeFile(fileEntry, null, false)
        console.log('File creation success: ' + fileEntry.name)
      }, fileApiCallbacks.onErrorCreateFile)

    }, fileApiCallbacks.onErrorLoadFs)
  },

  deleteFile: function () {

    fileName = document.getElementById('fileNameTxt').value

    console.log('Delete File Clicked: ' + fileName)
    var selectedDir = document.getElementById('selectCordovaDir').value

    window.resolveLocalFileSystemURL(selectedDir, function (dirEntry) {
      console.log('File System open: ' + dirEntry.name)

      dirEntry.getFile(fileName, {
        create: false,
        exclusive: false
      }, function (fileEntry) {
        //app.writeFile(fileEntry, null, false)
        fileEntry.remove(function (entry) {

          console.log("Remove success:" + entry)
        }, function failure(err) {
          console.log("Remove failure:" + JSON.stringify(err))
        })
      }, fileApiCallbacks.onErrorCreateFile)

    }, fileApiCallbacks.onErrorLoadFs)
  },

  moveFile: function () {


    // create awesome file for move to.
    fileName = document.getElementById('fileNameTxt').value

    var selectedDir = document.getElementById('selectCordovaDir').value

    console.log('Move File Clicked!. Filename: ' + fileName)


    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
      console.log('File System open: ' + dirEntry.name)

      dirEntry.getFile(fileName, {
        create: true,
        exclusive: false
      }, function (fileEntry) {
        //app.writeFile(fileEntry, null, false)
        console.log('File creation success: ' + fileEntry.name)

        window.resolveLocalFileSystemURL(selectedDir, function (newdirEntry) {

          console.log('Selected Dir: ' + selectedDir)

          console.log('File Entry: ' + JSON.stringify(fileEntry))

          console.log('New Dir Entry: ' + JSON.stringify(newdirEntry))


          var parent = selectedDir,
            parentName = parent.substring(parent.lastIndexOf('/') + 1),
            // newName = document.getElementById('newName').value,
            parentEntry = new DirectoryEntry(parentName, parent);

          //directoryEntry = new DirectoryEntry(cordova.file.externalRootDirectory,cordova.file.externalRootDirectory);

          fileEntry.moveTo(parentEntry, fileName, function () {
            console.log('Move success: ')
          }, function (err) {
            console.log('Move failure: ' + err.code)
          })
        })

      }, fileApiCallbacks.onErrorCreateFile)

    }, fileApiCallbacks.onErrorLoadFs)


  },

  readFile: function () {
    fileName = document.getElementById('fileNameTxt').value

    console.log('Create File Clicked!. Filename: ' + fileName)

    var selectedDir = document.getElementById('selectCordovaDir').value

    console.log('Selected Dir:' + selectedDir)

    window.resolveLocalFileSystemURL(selectedDir, function (dirEntry) {
      console.log('File System open: ' + dirEntry.name)

      dirEntry.getFile(fileName, {
        create: false,
        exclusive: false
      }, function (fileEntry) {
        //app.writeFile(fileEntry, null, false)
        console.log('File creation success: ' + fileEntry.name)

        fileEntry.file(function (file) {
          var reader = new FileReader();

          reader.onloadend = function () {
            console.log("Successful file read: " + this.result);
            // displayFileData(fileEntry.fullPath + ": " + this.result);
          };

          console.log('File:' + reader.readAsText(file))

        }, fileApiCallbacks.onErrorReadFile)
      }, fileApiCallbacks.onErrorCreateFile)

    }, fileApiCallbacks.onErrorLoadFs)
  },


  echoBtn: function () {
    echoMsg = document.getElementById('fileNameTxt').value
    console.log('Echo btn clicked: ' + echoMsg)
    CordovaAfexService.echo(echoMsg, function (echoValue) {
      alert("Callback Message Success: " + echoValue) // should alert true.
    }, function (error) {

      alert("Callback Message Failure  : " + error) // should alert true.
    })

  },

  getDeviceId: function () {
    CordovaAfexService.getDeviceId(function (successCallback) {
      alert("Callback Message Success: " + successCallback)
    }, function (errorCallback) {
      alert("Callback Message Failure  : " + errorCallback)
    })
  },

  rebootDevice: function () {
    CordovaAfexService.rebootDevice(function (successCallback) {
      alert("Callback Message Success: " + successCallback)
    }, function (errorCallback) {
      alert("Callback Message Failure  : " + errorCallback)
    })
  },

  afexSdkVersion: function () {

    console.log('afexSdkVersion btn clicked: ')

    CordovaAfexService.getAfexSdkVersion(function (afexSdkVersion) {
      alert("Afex Sdk Version: " + afexSdkVersion)

    }, function (errorCallback) {
      alert("Error Occured:\n " + errorCallback)
    })
  },

  androidSdkVersion: function () {
    console.log('androidSdkVersion btn clicked: ')

    CordovaAfexService.getAfexSdkVersion(function (androidSdkVersion) {
      alert("Android Sdk Version: " + androidSdkVersion)

    }, function (errorCallback) {
      alert("Error Occured:\n " + errorCallback)
    })

  }
}

app.initialize()