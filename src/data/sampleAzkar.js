// Daily Azkar Collection - User Provided Data
// Mapped to database schema with proper field names

export const sampleAzkar = [
  // Morning Azkar
  {
    category: 'morning',
    arabic: 'اللّهُمَّ أَصْبَحْنَا وَأَصْبَحَ المُلْكُ لِلَّهِ',
    transliteration: 'Allahumma asbahna wa asbaha al-mulku lillah',
    translation: 'O Allah, we have entered a new morning and so has the dominion, all belongs to Allah',
    repetitions: 1,
    benefits: 'Starting the day with Allah\'s remembrance',
    reference: 'Muslim 2723',
    order: 1
  },

  // Evening Azkar
  {
    category: 'evening',
    arabic: 'اللّهُمَّ أَمْسَيْنَا وَأَمْسَى المُلْكُ لِلَّهِ',
    transliteration: 'Allahumma amsayna wa amsal-mulku lillah',
    translation: 'O Allah, we have entered a new evening and so has the dominion, all belongs to Allah',
    repetitions: 1,
    benefits: 'Ending the day with gratitude to Allah',
    reference: 'Muslim 2723',
    order: 1
  },

  // Before Sleeping
  {
    category: 'before-sleeping',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allahumma amūtu wa ahyā',
    translation: 'In Your name, O Allah, I die and I live',
    repetitions: 1,
    benefits: 'Entrusting your soul to Allah before sleep',
    reference: 'Bukhari 6312',
    order: 1
  },

  // Waking Up
  {
    category: 'waking-up',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا',
    transliteration: 'Alhamdu lillahil-ladhi ahyana ba\'da ma amatana',
    translation: 'All praise is for Allah who gave us life after taking it from us',
    repetitions: 1,
    benefits: 'Thanking Allah for waking up to a new day',
    reference: 'Bukhari 6312',
    order: 1
  },

  // After Prayer
  {
    category: 'after-prayer',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    transliteration: 'Astaghfirullah',
    translation: 'I seek forgiveness from Allah',
    repetitions: 3,
    benefits: 'Seeking forgiveness after completing prayer',
    reference: 'Muslim 591',
    order: 1
  },

  // After Adhan
  {
    category: 'after-adhan',
    arabic: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ',
    transliteration: 'Allahumma rabba hadhihid-da\'watit-tammah',
    translation: 'O Allah, Lord of this perfect call and established prayer',
    repetitions: 1,
    benefits: 'The Prophet\'s intercession is guaranteed',
    reference: 'Bukhari 614',
    order: 1
  },

  // Entering Mosque
  {
    category: 'entering-mosque',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: 'Allahumma iftah li abwaba rahmatik',
    translation: 'O Allah, open for me the doors of Your mercy',
    repetitions: 1,
    benefits: 'Seeking Allah\'s mercy upon entering the mosque',
    reference: 'Muslim 713',
    order: 1
  },

  // Leaving Mosque
  {
    category: 'leaving-mosque',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    transliteration: 'Allahumma inni as\'aluka min fadlik',
    translation: 'O Allah, I ask You from Your bounty',
    repetitions: 1,
    benefits: 'Asking for Allah\'s grace when leaving',
    reference: 'Muslim 713',
    order: 1
  },

  // Eating - Before
  {
    category: 'eating',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillah',
    translation: 'In the name of Allah',
    repetitions: 1,
    benefits: 'Blessing the food before eating',
    reference: 'Abu Dawud 3767',
    order: 1
  },

  // Eating - After
  {
    category: 'eating',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا',
    transliteration: 'Alhamdu lillahil-ladhi at\'amana wa saqana',
    translation: 'Praise be to Allah who fed us and gave us drink',
    repetitions: 1,
    benefits: 'Thanking Allah after eating',
    reference: 'Abu Dawud 3850',
    order: 2
  },

  // Drinking - Before
  {
    category: 'drinking',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillah',
    translation: 'In the name of Allah',
    repetitions: 1,
    benefits: 'Blessing the drink before drinking',
    reference: 'General Sunnah',
    order: 1
  },

  // Drinking - After
  {
    category: 'drinking',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    translation: 'All praise is for Allah',
    repetitions: 1,
    benefits: 'Thanking Allah after drinking',
    reference: 'Bukhari 5458',
    order: 2
  }
]

// Category mapping for reference
export const azkarCategories = {
  'morning': 'Morning Azkar',
  'evening': 'Evening Azkar',
  'before-sleeping': 'Before Sleeping',
  'waking-up': 'Upon Waking Up',
  'after-prayer': 'After Prayer',
  'after-adhan': 'After Adhan',
  'entering-mosque': 'Entering Mosque',
  'leaving-mosque': 'Leaving Mosque',
  'eating': 'Eating Dua',
  'drinking': 'Drinking Dua'
}
