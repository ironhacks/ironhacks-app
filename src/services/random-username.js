import friendlyWords from 'friendly-words';

export default function randomUsername() {
  return [
    friendlyWords.predicates[Math.floor(Math.random() * friendlyWords.predicates.length)],
    friendlyWords.objects[Math.floor(Math.random() * friendlyWords.objects.length)],
  ].join(' ')
}

// export function randomUsernameNumbered() {
//   return [
//     friendlyWords.predicates[Math.floor(Math.random() * friendlyWords.predicates.length)],
//     friendlyWords.objects[Math.floor(Math.random() * friendlyWords.objects.length)],
//     Math.floor(Math.random() * 100).toString().padStart(2, '0'),
//   ].join(' ')
// }
