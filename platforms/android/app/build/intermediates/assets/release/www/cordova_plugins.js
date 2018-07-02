cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-ardic.DirectoryEntry",
    "file": "plugins/cordova-plugin-ardic/www/file/DirectoryEntry.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.DirectoryEntry"
    ]
  },
  {
    "id": "cordova-plugin-ardic.DirectoryReader",
    "file": "plugins/cordova-plugin-ardic/www/file/DirectoryReader.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.DirectoryReader"
    ]
  },
  {
    "id": "cordova-plugin-ardic.Entry",
    "file": "plugins/cordova-plugin-ardic/www/file/Entry.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.Entry"
    ]
  },
  {
    "id": "cordova-plugin-ardic.File",
    "file": "plugins/cordova-plugin-ardic/www/file/File.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.File"
    ]
  },
  {
    "id": "cordova-plugin-ardic.FileEntry",
    "file": "plugins/cordova-plugin-ardic/www/file/FileEntry.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.FileEntry"
    ]
  },
  {
    "id": "cordova-plugin-ardic.FileError",
    "file": "plugins/cordova-plugin-ardic/www/file/FileError.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.FileError"
    ]
  },
  {
    "id": "cordova-plugin-ardic.FileReader",
    "file": "plugins/cordova-plugin-ardic/www/file/FileReader.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.FileReader"
    ]
  },
  {
    "id": "cordova-plugin-ardic.FileSystem",
    "file": "plugins/cordova-plugin-ardic/www/file/FileSystem.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.FileSystem"
    ]
  },
  {
    "id": "cordova-plugin-ardic.FileUploadOptions",
    "file": "plugins/cordova-plugin-ardic/www/file/FileUploadOptions.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.FileUploadOptions"
    ]
  },
  {
    "id": "cordova-plugin-ardic.FileUploadResult",
    "file": "plugins/cordova-plugin-ardic/www/file/FileUploadResult.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.FileUploadResult"
    ]
  },
  {
    "id": "cordova-plugin-ardic.FileWriter",
    "file": "plugins/cordova-plugin-ardic/www/file/FileWriter.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.FileWriter"
    ]
  },
  {
    "id": "cordova-plugin-ardic.Flags",
    "file": "plugins/cordova-plugin-ardic/www/file/Flags.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.Flags"
    ]
  },
  {
    "id": "cordova-plugin-ardic.LocalFileSystem",
    "file": "plugins/cordova-plugin-ardic/www/file/LocalFileSystem.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.LocalFileSystem"
    ],
    "merges": [
      "window"
    ]
  },
  {
    "id": "cordova-plugin-ardic.Metadata",
    "file": "plugins/cordova-plugin-ardic/www/file/Metadata.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.Metadata"
    ]
  },
  {
    "id": "cordova-plugin-ardic.ProgressEvent",
    "file": "plugins/cordova-plugin-ardic/www/file/ProgressEvent.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.ProgressEvent"
    ]
  },
  {
    "id": "cordova-plugin-ardic.fileSystems",
    "file": "plugins/cordova-plugin-ardic/www/file/fileSystems.js",
    "pluginId": "cordova-plugin-ardic"
  },
  {
    "id": "cordova-plugin-ardic.requestFileSystem",
    "file": "plugins/cordova-plugin-ardic/www/file/requestFileSystem.js",
    "pluginId": "cordova-plugin-ardic",
    "clobbers": [
      "window.requestFileSystem"
    ]
  },
  {
    "id": "cordova-plugin-ardic.resolveLocalFileSystemURI",
    "file": "plugins/cordova-plugin-ardic/www/file/resolveLocalFileSystemURI.js",
    "pluginId": "cordova-plugin-ardic",
    "merges": [
      "window"
    ]
  },
  {
    "id": "cordova-plugin-ardic.androidFileSystem",
    "file": "plugins/cordova-plugin-ardic/www/android/FileSystem.js",
    "pluginId": "cordova-plugin-ardic",
    "merges": [
      "FileSystem"
    ]
  },
  {
    "id": "cordova-plugin-ardic.fileSystems-roots",
    "file": "plugins/cordova-plugin-ardic/www/file/fileSystems-roots.js",
    "pluginId": "cordova-plugin-ardic",
    "runs": true
  },
  {
    "id": "cordova-plugin-ardic.fileSystemPaths",
    "file": "plugins/cordova-plugin-ardic/www/file/fileSystemPaths.js",
    "pluginId": "cordova-plugin-ardic",
    "merges": [
      "cordova"
    ],
    "runs": true
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-ardic": "1.0.3"
};
// BOTTOM OF METADATA
});