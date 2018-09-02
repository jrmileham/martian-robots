# Work for Martian Robots

## Mars
- [x] Can't add duplicate lost points
- [x] Max size of grid can only be 50 x 50

## Robots
- [x] sanitise instruction
- [x] Max instruction size 100 chars
- [x] Process instruction
- [ ] Ignore instruction to go to "lostMarkers"

## Considerations
- Grid size that is negative? - currently allowed
- What should happen if instruction size > 100 chars? - currently truncated and error message generated
- What should happen if invalid instructions? currently stripped and error message
