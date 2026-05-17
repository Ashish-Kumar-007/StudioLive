
export default function About() {
  return (
    <div className="page-content py-24 px-6 max-w-7xl mx-auto" id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="reveal rounded-2xl overflow-hidden shadow-xl">
          <img src="/our-story.png" alt="The StudioLive Team behind the scenes" className="w-full object-cover" />
        </div>
        <div className="reveal">
          <h2 className="text-editorial text-4xl md:text-5xl text-primary mb-6">Our Story</h2>
          <h3 className="text-2xl font-bold mb-6">Passion for the perfect shot.</h3>
          <p className="text-dim text-lg mb-6 leading-relaxed">
            StudioLive was founded on a simple belief: every milestone deserves to be remembered beautifully. We are a collective of passionate visual storytellers specializing in weddings and grand functions.
          </p>
          <p className="text-dim text-lg mb-6 leading-relaxed">
            What started as a small group of creative friends has grown into a premier studio trusted by hundreds of families. We blend into the background of your event to capture candid, genuine emotion, while stepping up to direct the elegant, cinematic portraits you'll frame for a lifetime.
          </p>
        </div>
      </div>
    </div>
  );
}
