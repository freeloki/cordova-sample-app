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

var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    document.getElementById('getFileSystem').addEventListener('click', this.getFileSystemEvent)
    document.getElementById('clickMeBtn').addEventListener('click', this.clickEvent)
    document.getElementById('createFile').addEventListener('click', createFile)
    document.getElementById('deleteFile').addEventListener('click', deleteFile)
    document.getElementById('readFile').addEventListener('click', readFile)
    document.getElementById('makeDir').addEventListener('click', makeDir)
    document.getElementById('removeDir').addEventListener('click', removeDir)
    document.getElementById('moveFile').addEventListener('click', moveFile)
    document.getElementById('listFiles').addEventListener('click', listFiles)
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent('deviceready')
  },
  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id)
    var listeningElement = parentElement.querySelector('.listening')
    var receivedElement = parentElement.querySelector('.received')

    listeningElement.setAttribute('style', 'display:none;')
    receivedElement.setAttribute('style', 'display:block;')

    console.log('Received Event: ' + id)
  },



  clickEvent: function () {
    console.log('Button clicked')
    fileName = document.getElementById('fileNameTxt').value
    fileDir = document.getElementById('directoryNameTxt').value

    console.log("FileName: " + fileName + " FileDir: " + fileDir )
 /*function (fs) {

      console.log('file system open: ' + fs.name)
      fs.root.getFile('newPersistentFileAwesomeNihahahaah.txt', { create: true, exclusive: false }, function (fileEntry) {

        console.log('fileEntry is file?' + fileEntry.isFile.toString())
        // fileEntry.name == 'someFile.txt'
        // fileEntry.fullPath == '/someFile.txt'
        console.log('fileEntry full path : ' + fileEntry.fullPath.toString())
        writeFile(fileEntry, null)
      }, fileApiCallbacks.onErrorCreateFile)
    }, fileApiCallbacks.onErrorLoadFs(err))*/
  },

  getFileSystemEvent: function () {
    console.log('FS Event clicked')
    console.log(cordova.file)
  }
}

var fileApiCallbacks = {

  onErrorLoadFs: function (err) {
    console.log('Error occured: ' + err.toString())
  },
  onErrorCreateFile: function () {        
    console.log('Error occured: ' + err.toString())
  },

  onErrorReadFile: function () {      
  }

}

app.initialize()

function writeFile (fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {

    fileWriter.onwriteend = function () {
      console.log('Successful file write...')
      document.getElementById('logBox').innerHTML += 'File write success: ' + fileName
      readFile(fileEntry)
    }

    fileWriter.onerror = function (e) {
      console.log('Failed file write: ' + e.toString())
    }

    // If data object is not passed in,
    // create a new Blob instead.
    if (!dataObj) {
      dataObj = new Blob(['some file data'], { type: 'text/plain' })
    }

    fileWriter.write(dataObj)
  })
}

function readFile (fileEntry) {
  fileEntry.file(function (file) {
    var reader = new FileReader()

    reader.onloadend = function () {
      console.log('Successful file read: ' + this.result)
      // displayFileData(fileEntry.fullPath + ": " + this.result);
    }
    reader.readAsText(file)
  }, app.onErrorReadFile)
}

function createFile () {

  fileName = document.getElementById('fileNameTxt').value

  console.log('Create File Clicked: ' + fileName)

  window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
    console.log('file system open: ' + dirEntry.name)

    dirEntry.getFile(fileName, {create: true, exclusive: false}, function (fileEntry) {
      writeFile(fileEntry, null, false)
    }, fileApiCallbacks.onErrorCreateFile)
  }, fileApiCallbacks.onErrorLoadFs)
}
