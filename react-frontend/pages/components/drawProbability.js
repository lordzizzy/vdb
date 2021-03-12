const drawProbability = (x, N, n, k) => {
  const factorial = (n) => {
    return n ? n * factorial(n - 1) : 1;
  };

  const combinations = (n, r) => {
    return factorial(n) / (factorial(r) * factorial(n - r));
  };

  const exactProbability = (i, N, n, k) => {
    return (
      (combinations(k, i) * combinations(N - k, n - i)) / combinations(N, n)
    );
  };

  let prob = 0;
  for (let i = x; i <= n && i <= k; i++) {
    if (k - (N - n) > i) {
      prob = 1;
      break;
    } else {
      prob += exactProbability(i, N, n, k);
    }
  }
  if (0.99 < prob && prob < 1) {
    prob = 0.99;
  }
  if (0 < prob && prob < 0.01) {
    prob = 0.01;
  }
  return prob;
};

export default drawProbability;
