const form = document.querySelector("#protein-form");
const priceInput = document.querySelector("#price");
const totalProteinInput = document.querySelector("#total-protein");
const errorMessage = document.querySelector("#error-message");
const resultStatus = document.querySelector("#result-status");
const pricePerGramOutput = document.querySelector("#price-per-gram");
const pricePer10gOutput = document.querySelector("#price-per-10g");
const proteinPer10000Output = document.querySelector("#protein-per-10000");

const MAX_PRICE = 1000000000000;
const MAX_PROTEIN = 1000000000;

function formatNumber(value) {
  return new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function clearResults() {
  pricePerGramOutput.textContent = "—";
  pricePer10gOutput.textContent = "—";
  proteinPer10000Output.textContent = "—";
  resultStatus.textContent = "값을 확인해 주세요";
}

function validateInputs(priceValue, proteinValue) {
  if (priceValue.trim() === "" || proteinValue.trim() === "") {
    return "제품 가격과 총 단백질량을 모두 입력해 주세요.";
  }

  const price = Number(priceValue);
  const totalProtein = Number(proteinValue);

  if (!Number.isFinite(price) || !Number.isFinite(totalProtein)) {
    return "숫자만 입력해 주세요.";
  }

  if (price <= 0 || totalProtein <= 0) {
    return "가격과 단백질량은 0보다 커야 합니다.";
  }

  if (price > MAX_PRICE || totalProtein > MAX_PROTEIN) {
    return "입력값이 너무 큽니다. 제품 정보를 다시 확인해 주세요.";
  }

  return "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const priceValue = priceInput.value;
  const proteinValue = totalProteinInput.value;
  const validationError = validateInputs(priceValue, proteinValue);

  if (validationError) {
    errorMessage.textContent = validationError;
    clearResults();
    return;
  }

  const price = Number(priceValue);
  const totalProtein = Number(proteinValue);
  const pricePerGram = price / totalProtein;
  const pricePer10g = pricePerGram * 10;
  const proteinPer10000Won = (10000 * totalProtein) / price;

  errorMessage.textContent = "";
  pricePerGramOutput.textContent = `${formatNumber(pricePerGram)}원`;
  pricePer10gOutput.textContent = `${formatNumber(pricePer10g)}원`;
  proteinPer10000Output.textContent = `${formatNumber(proteinPer10000Won)}g`;
  resultStatus.textContent = "계산 완료";
});
