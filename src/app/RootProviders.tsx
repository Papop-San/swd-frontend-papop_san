"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "./styles/globals.scss"

interface Props {
  children: React.ReactNode;
}

const RootProviders: React.FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Provider>
  );
};

export default RootProviders;
