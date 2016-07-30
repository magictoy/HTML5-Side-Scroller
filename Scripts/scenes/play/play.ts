module scenes {
	export class Play extends objects.Scene{
		// Private instance varables
		private _bgImage:createjs.Bitmap;
		private _bubbles:Array<objects.Bubble>;
		private _player:objects.Player;
		private _sharks:Array<objects.Shark>;
		private _collision: managers.Collision;
		private _treasure: objects.Treasure;
		private _themeSound: createjs.AbstractSoundInstance;

		/**
		 * Creates an instance of Play.
		 * 
		 */
		constructor(){
			super();
		}

		// Public methmods
		/**
		 * Start methmod
		 */
		public Start():void{
			// create play objects
			this._bgImage=new createjs.Bitmap(core.assets.getResult("bgPlayImg"));
			this._bubbles = [
				new objects.Bubble(true),new objects.Bubble(true),new objects.Bubble(true),
				new objects.Bubble(true),new objects.Bubble(true),new objects.Bubble(true)
			];

			this._player=new objects.Player("diver");
			this._sharks=[
				new objects.Shark("shark"),new objects.Shark("shark"),new objects.Shark("shark")
			];
			

			// add objects to scent
			this.addChild(this._bgImage);
			this._bubbles.forEach(bubble => {
				this.addChild(bubble);
			});

			// add player to scene
			this.addChild(this._player);
			// add shark to scene
			this._sharks.forEach(shark => {
				this.addChild(shark);
			});

			this._treasure=new objects.Treasure();
			this.addChild(this._treasure);

			// add a collision managers
			this._collision=new managers.Collision();

			// add scene to stage
			core.stage.addChild(this);
			this._themeSound=createjs.Sound.play('theduel');
			this._themeSound.loop=-1;

		}

		public Update():void {
			// 
			this._bgImage.x-=5;
			// update on bubbles
			this._bubbles.forEach(bubble => {
				bubble.update();
			});

			// update player
			this._player.update();

			// update shark
			this._sharks.forEach(shark => {
				shark.update();
				this._collision.check(this._player, shark);
			});

			// update treasure
			this._treasure.update();
			this._collision.check(this._player, this._treasure);

			this.checkBounds();
		}

		private checkBounds() {
			if (this._bgImage.x<(-(this._bgImage.getBounds().width-640))) {
				this._bgImage.x=0;
			}
		}
	}

}