export function showNotification(setter) {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 2000);
}

export function checkWin(
  correct: string[],
  wrong: string[],
  word: string
): "win" | "lose" | "" {
  let status: "win" | "lose" | "" = "win";

  word.split("").forEach((letter) => {
    if (letter !== " " && !correct.includes(letter.toLowerCase())) {
      status = "";
    }
  });

  if (wrong.length === 6) status = "lose";
  return status;
}
