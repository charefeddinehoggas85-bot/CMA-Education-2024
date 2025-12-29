'use client';
import Navigation from './Navigation';
import Footer from './Footer';
import FloatingActions from '@/components/ui/FloatingActions';
var PageLayout = function (_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<div className={"min-h-screen ".concat(className)}>
      <Navigation />
      <main className="pt-header-offset md:pt-header-offset-mobile">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>);
};
export default PageLayout;
