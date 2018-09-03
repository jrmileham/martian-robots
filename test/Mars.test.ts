import { expect } from 'chai';

import Mars from '../src/store/Mars';

describe('Test Mars', function(): void {
  it('Cannot add duplicate lost position', function(): void {
    const mars: Mars = new Mars({x:5, y:5});

    expect(mars.lostMarkers.length).to.equal(0);
    mars.addLostMarker({x:2, y:3});
    mars.addLostMarker({x:2, y:3});
    mars.addLostMarker({x:1, y:2});
    
    expect(mars.lostMarkers.length).to.equal(2);
  });
  it('Max size for grid can only be 50 x 50', function(): void {
    let mars: Mars = new Mars({x:100, y:150});
    expect(mars.maxPosition).to.deep.equal({x: 50, y: 50});
     
    mars = new Mars({x:10, y:150});
    expect(mars.maxPosition).to.deep.equal({x: 10, y: 50});
    
    mars = new Mars({x:10, y:25});
    expect(mars.maxPosition).to.deep.equal({x: 10, y: 25});
  });
});