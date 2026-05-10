import { Instagram, Twitter, MapPin, Clock, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          <div className="md:col-span-1">
            <h2 className="text-4xl font-bebas tracking-[0.2em] mb-6">TAKKERU</h2>
            <p className="text-subtle/30 text-sm font-inter leading-relaxed max-w-xs">
              Where Tokyo rain meets sketchbook memories. A cinematic 2D experience in the heart of Delhi.
            </p>
          </div>

          <div>
            <h3 className="font-bebas text-xl tracking-widest text-accent mb-8">LOCATION</h3>
            <div className="flex items-start gap-4 text-subtle/50 text-sm">
              <MapPin className="w-5 h-5 flex-shrink-0 text-accent/50" />
              <p>Plot No. 12, Satya Niketan,<br />New Delhi, India 110021</p>
            </div>
          </div>

          <div>
            <h3 className="font-bebas text-xl tracking-widest text-accent mb-8">HOURS</h3>
            <div className="flex items-start gap-4 text-subtle/50 text-sm">
              <Clock className="w-5 h-5 flex-shrink-0 text-accent/50" />
              <div>
                <p>Mon - Fri: 11:00 AM - 11:00 PM</p>
                <p>Sat - Sun: 10:00 AM - 12:00 AM</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bebas text-xl tracking-widest text-accent mb-8">SOCIALS</h3>
            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-full hover:bg-accent hover:border-accent transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-full hover:bg-accent hover:border-accent transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-full hover:bg-accent hover:border-accent transition-all duration-300">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-subtle/20 text-xs tracking-[0.2em]">© 2024 TAKKERU CAFE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 text-[10px] text-subtle/20 tracking-widest uppercase font-bold">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms</a>
            <a href="#" className="hover:text-accent transition-colors">Career</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
