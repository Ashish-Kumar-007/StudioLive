export default function Events() {
  const categories = [
    {
      title: 'Weddings',
      desc: 'Cinematic coverage for your big day.',
      img: '/cat-wedding.png',
    },
    {
      title: 'Pre-Weddings',
      desc: 'Beautiful outdoor lifestyle portraits.',
      img: '/cat-prewedding.png',
    },
    {
      title: 'Corporate Functions',
      desc: 'Professional coverage for galas and events.',
      img: '/cat-corporate.png',
    },
    {
      title: 'Private Parties',
      desc: 'Birthdays, anniversaries, and family celebrations.',
      img: '/cat-party.png',
    },
  ];

  return (
    <div className="page-content py-24 px-6 max-w-7xl mx-auto" id="events">
      <div className="text-center mb-16 reveal">
        <h2 className="text-editorial text-4xl md:text-5xl text-primary mb-4">Events We Cover</h2>
        <p className="text-dim text-lg">From intimate ceremonies to grand celebrations.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
        {categories.map((cat, index) => (
          <div key={index} className="group rounded-2xl overflow-hidden relative aspect-[4/3] cursor-pointer">
            <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-editorial text-white text-3xl mb-2">{cat.title}</h3>
              <p className="text-white/80">{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
