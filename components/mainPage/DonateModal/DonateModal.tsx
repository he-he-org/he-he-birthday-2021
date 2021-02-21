import { ApiDonateModal, ApiIntro } from "../../../api";
import RichText from "../../prismic/RichText/RichText";

import s from "./DonateModal.module.scss";
import Title from "../../prismic/Title/Title";
import { useEffect, useState } from "react";
import { initPayment } from "../../../services/stripe.ts";

function parseNumber(string): number | null {
  if (string === "") {
    return null;
  }
  const preparedString = string.replaceAll(",", ".").replace(/^\$*/, "");
  const parsed = parseFloat(preparedString);
  if (Number.isNaN(parsed)) {
    return null;
  }
  return parsed;
}

interface Props {
  amount: number | null;
  donateModal: ApiDonateModal;
  onClose: () => void;
}

export default function DonateModal(props: Props): JSX.Element {
  const { donateModal, amount, onClose } = props;
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const parsed = parseNumber(value);

  useEffect(() => {
    setValue(amount == null ? "" : amount.toFixed(2));
  }, [amount]);

  return (
    <div className={s.root}>
      <div className={s.content}>
        <img
          className={s.cross}
          alt="Close modal"
          src="/cross.svg"
          onClick={onClose}
        />
        <img
          className={s.pic1}
          role="presentation"
          src="/donate_modal_pic1.svg"
        />
        <form
          className={s.form}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (parsed != null) {
              setLoading(true);
              initPayment(parsed)
                .then(() => {
                  setLoading(false);
                })
                .catch((e) => {
                  console.error(e);
                  setLoading(false);
                });
            }
          }}
        >
          <input
            className={s.input}
            placeholder={donateModal.amount_label
              .map(({ text }) => text)
              .join("; ")}
            value={value === "" ? value : value.replace(/^\$*/, "$")}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
          />
          <div className={s.pic2}>
            <img role="presentation" src="/donate_modal_pic2.svg" />
          </div>
          <button
            type="submit"
            className={s.button}
            disabled={parsed == null || loading}
          >
            <Title text={donateModal.confirm_button} />
          </button>
        </form>
      </div>
    </div>
  );
}
