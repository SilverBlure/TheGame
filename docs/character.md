# Character Class – Dokumentation

## melee()
makes a melee attack


### Ablauf
1. set character state to `finAttack`.
2. starts  (`playAnimationOnce`).
3. plays a sounf ( if active)
4. after 800ms  addMelee() get called
5. set  `this.action` again to `false`.


## bubble()
shoots a poison bubble as ranged attack


### Ablauf
1. check if key **A** is pressed, no action is active, and no cooldown is running.  
2. if `poisonBar.percentage > 10`:  
   - decrease poison bar by **20**,  
   - set `action = true` and `coolDown = true`,  
   - change state to `bubble` and reset animation frame.  
3. if not already animating → play bubble animation once.  
4. after **800ms**:  
   - call `addBubble()` to spawn the projectile,  
   - set `action = false`.  
5. after **3000ms**: reset `coolDown = false` (attack usable again). 

## animate()
starts the main character loop at ~60 FPS and orchestrates movement, attacks, state, and camera


### Ablauf
1. if a loop is already running (`loopIntervalID`) → return (prevent duplicates).  
2. start a `setInterval` with `1000/60` ms (≈60 FPS) and store its ID.  
3. on each tick:  
   - if `animation >= 3`:  
     - call `dead()` and `hurt()`,  
     - if **no** action is active (`!this.action`): run `move()`, `bubble()`, `melee()`, `idle()`, `stateBahavor()`, then reset `animation = 0`.  
   - if `idleCounter >= 2000`: set `idleTrigger = true` and reset `idleCounter = 0`.  
   - increment `idleCounter`.  
   - if `x < 2200`: follow the player by setting `world.camera_x = -this.x`.  
   - if the endboss is dead (`world.endboss.isDead()`): call `stopAnimation()`.  
   - increment `animation++`.  