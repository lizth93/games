interface Props {
  className?: string;
  children: React.ReactNode;
}

function Title(props: Props) {
  return (
    <svg viewBox="0 0 1500 150" className={props.className}>
      <symbol id="s-text">
        <text text-anchor="middle" x="50%" y="50%" dy=".35em">
          {props.children}
        </text>
      </symbol>

      <use xlinkHref="#s-text" className="text"></use>
      <use xlinkHref="#s-text" className="text"></use>
      <use xlinkHref="#s-text" className="text"></use>
      <use xlinkHref="#s-text" className="text"></use>
      <use xlinkHref="#s-text" className="text"></use>
    </svg>
  );
}
export default Title;
