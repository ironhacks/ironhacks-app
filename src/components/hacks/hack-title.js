const HackTitle = (
  {
    hackName,
    hackId,
  },
) => {
  return (
    <h2 className="pt-3">
      <span>{ hackName } </span>
      <span className="small">({ hackId })</span>
    </h2>
  );
};

export { HackTitle }
