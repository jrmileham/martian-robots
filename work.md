# Work for Martian Robots

## Mars
- [x] Can't add duplicate lost points
- [x] Max size of grid can only be 50 x 50

## Robots
- [x] sanitise instruction
- [x] Max instruction size 100 chars
- [x] Process instruction
- [x] Ignore instruction to go to "lostMarkers"
- [x] Informs map of "lostMarker" position
- [x] print its position

## UI
- [x] Create basic CLI interface
- [x] Have controller to translate commands
- [ ] Validate input

## Considerations
- Grid size that is negative? - currently allowed
- Do Robots continue to move if they go off grid?
- If above, and they come on grid, it is assumed they are not lost
- What should happen if instruction size > 100 chars? - currently truncated and error message generated
- What should happen if invalid instructions? currently stripped and error message
- Use events or something so that robots can communicate to the map
