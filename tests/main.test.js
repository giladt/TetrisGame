import Main from './src/main.js';

describe('Main', () => {
  
  let main;
  
  beforeEach(() => {
    main = new Main();
  });

  test('should have a class name Main', () => {
    expect(Main).toBeDefined();
    expect(main).toBeInstanceOf(Main);
  });

  describe('Setup method', () => {
    
    beforeEach(() => {
      main = new Main();
    });

    test('should have a setup method', () => {
      expect(main.setup).toBeDefined();
    });
  
    test('should have a stage object', () => {
      expect(main.setup).toBeDefined();
    });
  });

});