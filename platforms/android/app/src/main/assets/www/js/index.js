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


var fileApiCallbacks = {

  onErrorLoadFs: function () {
    console.log('Error occured: ' )
    app.writeLog('Error occured: ' )

  },
  onErrorCreateFile: function () {        
    console.log('Error occured: ')
    app.writeLog('Error occured: ')


  },

  onErrorReadFile: function () {
    console.log('Error occured: ')
    app.writeLog('Error occured: ')

  }

}
var app = {
  // Application Constructor

  writeLog: function(msg,extra){
    document.getElementById('logBox').innerHTML = msg + extra
  },

  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    document.getElementById('getFileSystem').addEventListener('click', this.getFileSystemEvent)
    document.getElementById('clickMeBtn').addEventListener('click', this.clickEvent)
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
  },
  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id)
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
    console.log('Get Fs clicked')
    console.log(cordova.file)
    writeLog('Get Fs clicked',cordova.file.toString())

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
        dataObj = new Blob(['some file data'], { type: 'text/plain' })
      }
  
      fileWriter.write(dataObj)
    })
  },
  
  readFile: function () {
  
    console.log('readFile clicked')
  
  
    fileName = document.getElementById('fileNameTxt').value
  
    fileDir = cordova.file.dataDirectory

    console.log('file dir: ' + fileDir)

    window.resolveLocalFileSystemURL(fileDir, function (dirEntry) {
      console.log('file system open: ' + dirEntry.name)
  
  
      dirEntry.getFile(fileName, {create: true, exclusive: false}, function (fileEntry) {
  
        fileEntry.file(function (file) {
          var reader = new FileReader()
      
          reader.onloadend = function () {
            console.log('Successful file read: ' + this.result)
  
            // displayFileData(fileEntry.fullPath + ": " + this.result);
          }
          reader.readAsText(file)
  
          console.log("Reader:" + reader)
        }, fileApiCallbacks.onErrorReadFile())
        
      }, fileApiCallbacks.onErrorCreateFile())
    }, fileApiCallbacks.onErrorLoadFs())
  
  
  
  
  
  },
  
  createFile: function () {
  
    console.log('createFile clicked')
  
    fileName = document.getElementById('fileNameTxt').value
  
    //fileDir = cordova.file.dataDirectory
  
    console.log('Create File Clicked: ' + fileName)
  
  
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
      app.writeLog('file system open: ' , dirEntry.name)
  
  
      dirEntry.getFile(fileName, {create: true, exclusive: false}, function (fileEntry) {
        app.writeFile(fileEntry, null, false)
      }, fileApiCallbacks.onErrorCreateFile)
    }, fileApiCallbacks.onErrorLoadFs)
  
  }
  
  


  
}

app.initialize()


