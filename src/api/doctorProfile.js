export function updateSpeciality(userId, specialities) {

}

export function fetchRecentPatients(useridOfDoctor, searchKeyword, date) {

}

export function searchDoctor(keyword) {
  return Promise.resolve(search);
}

const search = {
  data: [
    {
      userId: 'santanu',
      name: 'Santanu',
      shortDesc: 'Has plenty of experience in treating cancer patients in prestigious institutes',
      specialities: ['onocologist', 'cancer'],
      image: '',
      avatar: 'doctor-1',
      profileUrl: '',
      availability: 'offline', // offline online busy
    },
    {
      userId: 'shreela',
      name: 'Shreela',
      shortDesc: 'Expert in handling emergency situations with heart related ailments',
      specialities: ['ENT', 'cardio', 'surgery'],
      image: '',
      avatar: 'doctor-1',
      profileUrl: '',
      availability: 'offline',
    },
    {
      userId: 'anushree',
      name: 'Anushree',
      shortDesc: 'Expert in handling emergency situations with heart related ailments',
      specialities: ['ENT', 'cardio'],
      image: '',
      avatar: 'doctor-1',
      profileUrl: '',
      availability: 'offline',
    }
  ]
}