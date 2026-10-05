export const POND_FISH = [
  { name: 'Luna', trait: 'The daydreamer', reflection: 'What part of your inner world would you like someone to understand?', colors: ['#e8dfc8', '#7c9276', '#313c32'] },
  { name: 'Sol', trait: 'The connector', reflection: 'Who makes you feel most like yourself?', colors: ['#efdfc5', '#c8582c', '#30312b'] },
  { name: 'Nova', trait: 'The curious one', reflection: 'What are you learning about yourself lately?', colors: ['#f0e6d1', '#c89442', '#ebe2c9'] },
  { name: 'Moss', trait: 'The quiet observer', reflection: 'Does stillness recharge you, or does being around others?', colors: ['#b5c1a2', '#3b5144', '#dfdbc3'] },
  { name: 'Orbit', trait: 'The gentle companion', reflection: 'How do the people around you shape the person you are becoming?', colors: ['#e5dcc8', '#343b37', '#b8643b'] },
  { name: 'Comet', trait: 'The explorer', reflection: 'Which unfamiliar path keeps catching your attention?', colors: ['#dca658', '#b16835', '#e8d3a3'] },
];

export const REFLECTIONS = [
  { theme: 'INFJ / an inner world', text: 'There is a whole world beneath a quiet surface. Stay curious about what you cannot see.' },
  { theme: 'Virgo / the little things', text: 'A small detail. A thoughtful gesture. Sometimes care is something you notice before you can name it.' },
  { theme: 'Personality', text: 'Some of us recharge in stillness. Some, in the company of others. There is room for both here.' },
  { theme: 'Connection', text: 'We become ourselves in quiet moments, and in the small ways we meet each other.' },
  { theme: 'Constellations', text: 'A constellation is a story we find between separate points. Connection can be like that, too.' },
  { theme: 'Curiosity', text: 'A type, a sign, a first impression. A starting point for curiosity, never the whole person.' },
];

export function createSwimmers() {
  return POND_FISH.map((fish, index) => {
    const angle = index * Math.PI / 3;
    return { ...fish, x: Math.cos(angle) * 4.2, z: Math.sin(angle) * 3.2, heading: angle, phase: index * 1.37, targetX: -Math.sin(angle) * 5, targetZ: Math.cos(angle) * 3, turnAt: index + 3 };
  });
}

export function stepSwimmers(fish, food, pointer, time, delta) {
  const dt = Math.max(0, Math.min(delta, .05));
  for (let i = food.length - 1; i >= 0; i -= 1) {
    if (time - food[i].born > 12) food.splice(i, 1);
  }
  fish.forEach((swimmer, index) => {
    let target = null;
    let nearest = Infinity;
    food.forEach((pellet) => {
      const distance = Math.hypot(pellet.x - swimmer.x, pellet.z - swimmer.z);
      if (distance < nearest) { nearest = distance; target = pellet; }
    });
    if (target && nearest < .55) {
      food.splice(food.indexOf(target), 1);
      target = null;
    }
    if (!target && pointer && Math.hypot(pointer.x - swimmer.x, pointer.z - swimmer.z) < 4.5) target = pointer;
    if (!target) {
      if (time > swimmer.turnAt || Math.hypot(swimmer.targetX - swimmer.x, swimmer.targetZ - swimmer.z) < 1) {
        const angle = time * .27 + index * 2.4;
        swimmer.targetX = Math.cos(angle) * (4.5 + Math.sin(index + time * .2));
        swimmer.targetZ = Math.sin(angle) * 4;
        swimmer.turnAt = time + 5 + index * .3;
      }
      target = { x: swimmer.targetX, z: swimmer.targetZ };
    }
    let dx = target.x - swimmer.x;
    let dz = target.z - swimmer.z;
    fish.forEach((other) => {
      const separation = Math.hypot(swimmer.x - other.x, swimmer.z - other.z);
      if (other !== swimmer && separation < 1.25 && separation > .001) {
        dx += (swimmer.x - other.x) / separation * 1.5;
        dz += (swimmer.z - other.z) / separation * 1.5;
      }
    });
    const desired = Math.atan2(dx, dz);
    const turn = Math.atan2(Math.sin(desired - swimmer.heading), Math.cos(desired - swimmer.heading));
    swimmer.heading += Math.max(-dt * 1.4, Math.min(dt * 1.4, turn));
    const speed = (food.length ? 1.25 : .62) + index * .045;
    swimmer.x += Math.sin(swimmer.heading) * speed * dt;
    swimmer.z += Math.cos(swimmer.heading) * speed * dt;
    const edge = Math.hypot(swimmer.x / 7.8, swimmer.z / 5.6);
    if (edge > 1) { swimmer.x /= edge; swimmer.z /= edge; swimmer.targetX = 0; swimmer.targetZ = 0; }
  });
}
