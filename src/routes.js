import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Main } from "./pages/Main/index.js";

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/user/:id" component={Main} />
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  );
}
