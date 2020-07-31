import friendlyWords from 'friendly-words';

export default function randomTeamname(){
  return [
    friendlyWords.predicates[Math.floor(Math.random() * friendlyWords.predicates.length)],
    friendlyWords.teams[Math.floor(Math.random() * friendlyWords.teams.length)]
  ].join(' ')
}
