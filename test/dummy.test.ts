describe('Test Setup Verification', () => {
  it('should pass a basic assertion', () => {
    expect(true).toBe(true);
  });

  it('should perform arithmetic correctly', () => {
    const result = 2 + 2;
    expect(result).toBe(4);
  });

  it('should work with strings', () => {
    const message = 'Hello, Jest!';
    expect(message).toContain('Jest');
  });
});
