const servicesWithItunesAppBanner = ['arabic', 'mundo', 'russian'];

export default service => {
  describe('SEO', () => {
    describe('apple-itunes-app meta tag', () => {
      const appleItunesApp = document.querySelector(
        'meta[name="apple-itunes-app"]',
      );

      if (servicesWithItunesAppBanner.includes(service)) {
        const content = appleItunesApp.getAttribute('content');

        it('should be in the document', () => {
          expect(appleItunesApp).toBeInTheDocument();
        });

        it('should contain text', () => {
          expect(content).toBeTruthy();
        });

        it('should match text', () => {
          expect(content).toMatchSnapshot();
        });
      } else {
        it('should not be in the document', () => {
          expect(appleItunesApp).not.toBeInTheDocument();
        });
      }
    });
  });
};
