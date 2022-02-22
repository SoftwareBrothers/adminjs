// jeśli zdefiniowany jest branding to ignorujemy defaultBranding dopóki nie wywalimy branding z kodu. Ten @deprecated jest po to zeby dać ludziom czas na zmianę, ale nie robić major update
// stworzylibyśmy za to jakąś klasę abstrakcyjną która byłaby szablonem dla brandingów, np. Branding i podobnie jak jest np. z Resource i ResourceDecorator byłaby jakaś funkcja toJSON która zamienia to na jsona
// dodalibyśmy obok defaultBranding jeszcze coś takiego jak selectableBrandings i to by wpadało do tego selektora w adminie.
// defaultBranding byłļy typu Branding a selectableBrandings byłby Branding[]
// trzeba by sprawdzić czy w tym podejściu klasowym zadziała coś jak ten BrandingOptionsFunction który jest aktualnie. Czyli czy można dodać metodę isAccessible do Branding i czy to będzie pozwalało ustawić jaki user ma dostęp a jaki nie.
// te themesy z repo które dodałeś ustawiałoby się jakimś setterem w tej klasie

import AdminJS, { CurrentAdmin } from 'src';

class BrandingDecorator {
  private _admin: AdminJS;

  constructor({ admin }: { admin: AdminJS }) {
    this._admin = admin;
  }

  /**
   * Is action accessible
   *
   * @param {CurrentAdmin} [currentUser] Current logged in user
   * @return  {Boolean}
   */
  isAccessible(currentUser?: CurrentAdmin): boolean {
    return true;
  }

  toJSON() {
    return {};
  }
}

export default BrandingDecorator;
