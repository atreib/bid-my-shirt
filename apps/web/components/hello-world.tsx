type Props = {
  action: () => void;
};

export function HelloWorld({ action }: Props) {
  return (
    <button onClick={() => action()} type="button">
      Hello World!
    </button>
  );
}
