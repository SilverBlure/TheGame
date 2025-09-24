
# world Documentation

## checkProjectileEnemyCollision()
checks if a projectile collides with an enemy and applies damage

### Ablauf
1. iterate over all `throwableObjects` (projectiles).  
2. for each projectile, check collision with every enemy using `isColliding()`.  
3. if collision detected:  
   - call `enemy.hit(40)` to apply damage,  
   - mark projectile as `hit` so it gets removed,  
   - if enemy is `Pufferfish` or `Endboss` → play sound (if enabled).  
4. keep only projectiles that did **not** hit an enemy (`filter`).  



## draw()
renders the game frame on the canvas

### Ablauf
1. clear the canvas with `clearRect`.
2. shift the canvas by `camera_x` to simulate camera movement.
3. draw background objects, then reset translation.
4. draw UI elements (`statusBar`, `poisonBar`, `coinBar`).
5. shift again by `camera_x` to draw world objects.
6. render collectables, character, enemies, throwable objects, and melee attacks.
7. reset translation back to default.
8. check fullscreen mode for `"game"`.
9. if device is mobile → draw mobile controller.
10. if `state === "gameOver"`:
    - stop background music,  
    - draw game over screen,  
    - play game over sound once,  
    - add "try again" button.  
11. if `state === "win"`:
    - stop background music,  
    - draw win screen,  
    - play win sound once,  
    - add "try again" button.  


## update()
updates the game state each frame by performing checks and actions

### Ablauf
1. increase `frameCounter` by 1.  
2. check collision between character and enemies.  
3. check collision between projectiles and enemies.  
4. check collision between character and collectables.  
5. remove dead enemies (`clearDeadEnemys`).  
6. check win condition (`win`).  
7. if `state !== "gameOver"` → allow retry (`tryAgain`).  
8. check if enemies run out of bounds.  
9. respawn enemies (`reSpawnEnemie`).  
10. stop projectiles that are no longer active.  
11. check collision of melee attack (`checkCollisionFinSlap`).  
12. if boss not yet started → start endboss interval (`endbossInterval`).  
13. run jellyfish interval logic.  
14. run pufferfish interval logic.  
15. if `frameCounter > 100000` → reset it to 0 (overflow prevention). 