const imageBase = `${process.env.PUBLIC_URL}/Images`
const videoBase = `${process.env.PUBLIC_URL}/Videos`

export const content = {
  name: 'Viii',
  sender: 'Bfame',
  birthday: '2026-07-30',

  welcome: {
    title: 'Getting Ready for Your Day',
    subtitle: 'Every moment is a step closer to celebrating you.',
  },

  letter: {
    salutation: 'My Dearest Viii,',
    body: `Get ready, because something beautiful is being prepared just for you. These past few days, I've been putting everything together — not just a celebration, but a moment that truly reflects how much you mean to me.
    
I need you to be prepared. Prepared to feel loved, cherished, and celebrated like never before. Your day is coming, and I want you to know that every little detail has been thought of with you in mind.
    
So when the time comes, just smile, open your heart, and let it all in. You deserve every bit of this and more.
    
Be ready, Viii. Something special is on its way.`,
    closing: 'With all my love,',
    signature: 'Bfame',
    quote: 'A true friend is the greatest of all blessings, and you are truly one of a kind.',
    quoteAuthor: '',
  },

  memories: [
    { id: 1, title: 'Beautiful Soul', date: '2026', caption: 'Radiant, graceful, and absolutely stunning. 💖', image: `${imageBase}/IMG-20260720-WA0025.jpg` },
    { id: 2, title: 'When Our Eyes First Met', date: 'Feb 2026', caption: 'The moment everything changed forever. 💫', image: `${imageBase}/IMG-20260720-WA0022.jpg` },
    { id: 3, title: 'Radiant & Beautiful', date: '2026', caption: 'You light up every room you walk into. ☀️', image: `${imageBase}/IMG-20260720-WA0024.jpg` },
    { id: 4, title: 'Stunning Portrait', date: '2026', caption: 'Absolutely breathtaking every single time. ✨', image: `${imageBase}/IMG-20260720-WA0026.jpg` },
    { id: 5, title: 'Natural Queen', date: '2026', caption: 'No filter needed — pure elegance. 👑', image: `${imageBase}/IMG-20260720-WA0029.jpg` },
    { id: 6, title: 'Magnetic Energy', date: '2026', caption: 'Your presence is a gift to everyone around you. 🌟', image: `${imageBase}/1000019648.jpg` },
    { id: 7, title: 'Golden Hour Glow', date: '2026', caption: 'Even the sun bows to your beauty. 🌞', image: `${imageBase}/IMG_20260427_072541_956.jpg` },
    { id: 8, title: 'Smiling Under the Sun', date: '2026', caption: 'Surrounded by green, glowing with grace. 🌿', image: `${imageBase}/smile.jpg` },
    { id: 9, title: 'Pure Elegance', date: '2026', caption: 'A vision of beauty and grace. 💎', image: `${imageBase}/685543308_17880947127560952_7751298600604457585_n.jpg` },
    { id: 10, title: 'Simply Mesmerizing', date: '2026', caption: 'You take my breath away. 💫', image: `${imageBase}/687251580_17880947187560952_7765583062784657422_n.jpg` },
  ],

  videos: [
    { id: 1, title: 'A Beautiful Moment', src: `${videoBase}/VID-20260720-WA0039.mp4`, caption: 'Moments with you are my favorite 💕' },
    { id: 2, title: 'Cherished Times', src: `${videoBase}/VID-20260720-WA0040.mp4`, caption: 'Every second with you is a treasure ✨' },
  ],

  timeline: [
    { year: 'Feb 2026', title: 'The Day We Met', description: 'February 2026 — the month our beautiful journey began. I had no idea then how much my life was about to change for the better. 💫', icon: '💫' },
    { year: 'Feb 2026', title: 'Our First Connection', description: 'From our very first conversations, I knew you were someone special. Your energy, your vibe — unmatched. ✨', icon: '✨' },
    { year: 'Mar 2026', title: 'Getting Closer', description: 'Late night talks, shared laughs, and moments that started to mean everything. 🌙', icon: '🌙' },
    { year: 'Apr 2026', title: 'Building Memories', description: 'Every day with you became a new adventure. From spontaneous calls to deep conversations. 📸', icon: '📸' },
    { year: 'Jun 2026', title: 'Growing Stronger', description: 'Through every laugh and every talk, our bond grew unshakable. 🤝', icon: '🤝' },
    { year: 'Jul 2026', title: 'Preparing for You', description: 'Getting everything ready to celebrate the most amazing person I have ever known. Your day is almost here! 🎉🎂', icon: '🎉' },
  ],

  reasons: [
    { title: 'Your Kindness', description: 'You have the purest heart and always put others before yourself.', icon: '💝', color: 'from-pink-400 to-rose-400' },
    { title: 'Your Strength', description: 'You face every challenge with grace and determination that inspires everyone.', icon: '🦋', color: 'from-purple-400 to-blue-400' },
    { title: 'Your Laughter', description: 'Your laugh is contagious and can brighten the darkest of days.', icon: '✨', color: 'from-yellow-400 to-pink-400' },
    { title: 'Your Wisdom', description: 'You always know the right thing to say at the right time.', icon: '🌟', color: 'from-blue-400 to-purple-400' },
    { title: 'Your Loyalty', description: 'You stand by the people you love through thick and thin.', icon: '💎', color: 'from-rose-400 to-yellow-400' },
    { title: 'Your Spirit', description: 'Your zest for life is infectious and makes every day an adventure.', icon: '🌈', color: 'from-purple-400 to-pink-400' },
  ],

  wishes: [
    { name: 'Your Biggest Fan', message: 'Everything is being prepared for the most amazing day for the most amazing person I know!', emoji: '🎂' },
    { name: 'Secret Admirer', message: 'The world is a better place with you in it. Keep shining, beautiful soul!', emoji: '💫' },
    { name: 'Forever Friend', message: 'Through every season, every change, every mile — you remain my favorite person. Getting ready to celebrate you!', emoji: '💖' },
    { name: 'The Universe', message: 'You are made of stardust and dreams. Never forget how extraordinary you are.', emoji: '🌌' },
    { name: 'Heart Speaks', message: 'Some people make the world brighter just by being in it. That\'s you. Preparing something special for you!', emoji: '🌞' },
    { name: 'Destiny', message: 'Some friendships are written in the stars. Ours is one of them. Celebrate YOU today!', emoji: '⭐' },
  ],

  songs: [
    { title: 'Perfect', artist: 'Ed Sheeran', emoji: '🎵', file: 'Ed Sheeran - Perfect (Official Music Video).webm' },
    { title: 'Count On Me', artist: 'Bruno Mars', emoji: '🎶', file: 'Bruno Mars - Count on Me (Official Lyric Video).webm' },
    { title: 'Close Friend', artist: 'Maxwell', emoji: '🎵', file: 'Close Friend.webm' },
    { title: 'You\'ve Got a Friend', artist: 'Carole King', emoji: '🎵', file: 'Carole King - You\'ve Got a Friend (Official Audio).webm' },
    { title: 'Best Friend', artist: 'Jason Mraz', emoji: '🎶', file: 'Jason Mraz - Best Friend (Official Audio).webm' },
    { title: 'Thank You', artist: 'Dido', emoji: '🎵', file: 'Dido - Thank You (Official Video).webm' },
    { title: 'I\'ll Be There', artist: 'The Jackson 5', emoji: '🎶', file: 'Jackson 5-I\'ll Be There.webm' },
  ],

  surpriseMessages: [
    'Getting ready to celebrate the most beautiful soul I know! ✨',
    'The world is getting ready for you! 🌟',
    'Preparing something as amazing as you are! 💫',
    'Everything is being set for your special moments! 🌙',
    'You are loved more than you know! 💖',
    'Almost time to celebrate you! 🎉',
  ],
}
