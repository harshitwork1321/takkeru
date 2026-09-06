import { Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary pt-24 pb-12 border-t border-white/5" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">

          <div className="md:col-span-1">
            <h2 className="text-4xl font-bebas tracking-[0.2em] mb-6">TAKKERU CART</h2>
            <p className="text-subtle/30 text-sm font-inter leading-relaxed max-w-xs mb-4">
              Mobile boba tea, mandu, and ramen business. Take the cart to where the crowd is.
            </p>
            <p className="text-accent/60 text-xs font-inter uppercase tracking-widest">
              A Brand By Anubind Group Pvt Ltd
            </p>
          </div>

          <div>
            <h3 className="font-bebas text-xl tracking-widest text-accent mb-8">QUICK LINKS</h3>
            <nav className="space-y-3">
              <a href="#how-it-works" className="block text-subtle/50 text-sm hover:text-accent transition-colors">How It Works</a>
              <a href="#locations" className="block text-subple/50 text-sm hover:text-accent transition-colors">Locations</a>
              <a href="#menu" className="block text-subtle/50 text-sm hover:text-accent transition-colors">Menu</a>
              <a href="#faq" className="block text-subtle/50 text-sm hover:text-accent transition-colors">FAQ</a>
            </nav>
          </div>

          <div>
            <h3 className="font-bebas text-xl tracking-widest text-accent mb-8">CONTACT</h3>
            <div className="space-y-4">
              <a href="mailto:contact@takkeru.com" className="flex items-center gap-3 text-subtle/50 text-sm hover:text-accent transition-colors">
                <Mail className="w-4 h-4" aria-hidden="true" />
                contact@takkeru.com
              </a>
              <p className="text-subtle/50 text-sm">
                Available across India
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bebas text-xl tracking-widest text-accent mb-8">SOCIALS</h3>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/takkeru_cafe" target="_blank" rel="noopener noreferrer" aria-label="Follow TAKKERU CART on Instagram" className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-full hover:bg-accent hover:border-accent transition-all duration-300">
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#" aria-label="Follow TAKKERU CART on Twitter" className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-full hover:bg-accent hover:border-accent transition-all duration-300">
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-subtle/20 text-xs tracking-[0.2em]">© 2026 TAKKERU CART. ALL RIGHTS RESERVED.</p>
          <nav aria-label="Footer legal links" className="flex gap-8 text-[10px] text-subtle/20 tracking-widest uppercase font-bold">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms</a>
            <a href="#" className="hover:text-accent transition-colors">Career</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
