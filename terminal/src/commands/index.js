export const commandNames = [
  'cat',
  'cd',
  'clear',
  'history',
  'ls'
];

export default commandNames.reduce((mapping, commandName) => {
  return {
    ...mapping,
    [commandName]: {
      function: require(`../commands/${commandName}`).default,
      optDef: require(`../commands/${commandName}`).optDef
    }
  };
}, {});
