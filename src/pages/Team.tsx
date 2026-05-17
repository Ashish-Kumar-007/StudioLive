export default function Team() {
  const members = [
    {
      name: 'James Miller',
      role: 'Lead Photographer',
      img: '/team_1_1779003510875.png',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Lead Cinematographer',
      img: '/team_2_1779003526664.png',
    },
    {
      name: 'David Chen',
      role: 'Head Editor',
      img: '/team_3_1779003548013.png',
    },
  ];

  return (
    <div className="page-content py-24 px-6 max-w-7xl mx-auto" id="team">
      <div className="text-center mb-16 reveal">
        <h2 className="text-editorial text-4xl md:text-5xl text-primary mb-4">Meet the Team</h2>
        <p className="text-dim text-lg">The creatives dedicated to capturing your story.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 reveal">
        {members.map((member, index) => (
          <div key={index} className="text-center group">
            <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 border-4 border-surface shadow-lg group-hover:border-primary transition-colors duration-300">
              <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
