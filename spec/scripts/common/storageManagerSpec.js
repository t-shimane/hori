describe("StorageManager", function() {
  var manager;

  beforeEach(function() {
    manager = ModuleManager.module("myapp.common.storagemanager");
  });

  describe("save-load", function(){
    it("01", function(){
      manager.save("key", "value");
      expect(manager.load("key")).toEqual("value");
    });
  });

  describe("save-loadObject", function(){
    it("01", function(){
      manager.saveObject("jsonKey01", {
        test1: 1,
        test2: "2"
      });
      expect(manager.loadObject("jsonKey01").test1).toEqual(1);
      expect(manager.loadObject("jsonKey01").test2).toEqual("2");
    });

    it("02", function(){
      manager.saveObject("jsonKey02", [1,2]);
      expect(manager.loadObject("jsonKey02")[0]).toEqual(1);
      expect(manager.loadObject("jsonKey02")[1]).toEqual(2);
    });

    it("03", function(){
      manager.saveObject("jsonKey02", [1,2]);
      var obj = manager.loadObject("jsonKey02");
      obj[0] = 3;
      expect(manager.loadObject("jsonKey02")[0]).toEqual(1);
      expect(manager.loadObject("jsonKey02")[1]).toEqual(2);
    })
  });

  describe("removeData-exists", function(){
    beforeEach(function(){
      manager.save("key", "value");
    });
    
    it("01", function(){
      manager.removeData("key");
      expect(manager.exists("key")).toEqual(false);
    });

    it("02", function(){
      expect(manager.exists("key")).toEqual(true);
    })


  });

  // it("should be able to play a Song", function() {
  //   player.play(song);
  //   expect(player.currentlyPlayingSong).toEqual(song);

  //   //demonstrates use of custom matcher
  //   expect(player).toBePlaying(song);
  // });

  // describe("when song has been paused", function() {
  //   beforeEach(function() {
  //     player.play(song);
  //     player.pause();
  //   });

  //   it("should indicate that the song is currently paused", function() {
  //     expect(player.isPlaying).toBeFalsy();

  //     // demonstrates use of 'not' with a custom matcher
  //     expect(player).not.toBePlaying(song);
  //   });

  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });

  // // demonstrates use of spies to intercept and test method calls
  // it("tells the current song if the user has made it a favorite", function() {
  //   spyOn(song, 'persistFavoriteStatus');

  //   player.play(song);
  //   player.makeFavorite();

  //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  // });

  // //demonstrates use of expected exceptions
  // describe("#resume", function() {
  //   it("should throw an exception if song is already playing", function() {
  //     player.play(song);

  //     expect(function() {
  //       player.resume();
  //     }).toThrowError("song is already playing");
  //   });
  // });
});
