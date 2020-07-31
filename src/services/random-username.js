import friendlyWords from 'friendly-words';

export default function randomUsername(){
  return [
    friendlyWords.predicates[Math.floor(Math.random() * friendlyWords.predicates.length)],
    friendlyWords.objects[Math.floor(Math.random() * friendlyWords.objects.length)]
  ].join(' ')
}
