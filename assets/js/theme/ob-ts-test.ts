import utils from '@bigcommerce/stencil-utils';

export interface CartQuantityOptions {
    baseUrl: string;
    cartId: string;
}

export type CartQuantityResult =
    | { status: 'ok'; quantity: number }
    | { status: 'empty' }
    | { status: 'error'; message: string };

type StencilCallback<T> = (err: string | null, data: T) => void;

/**
 * Promisify a stencil-utils callback-style API call.
 */
function promisify<T>(call: (cb: StencilCallback<T>) => void): Promise<T> {
    return new Promise((resolve, reject) => {
        call((err, data) => (err ? reject(new Error(err)) : resolve(data)));
    });
}

export async function fetchCartQuantity(options: CartQuantityOptions): Promise<CartQuantityResult> {
    try {
        const quantity = await promisify<number>(cb => utils.api.cart.getCartQuantity(options, cb));
        return quantity > 0 ? { status: 'ok', quantity } : { status: 'empty' };
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        // A missing cart is a normal state, not a failure
        return message === 'Not Found' ? { status: 'empty' } : { status: 'error', message };
    }
}

export function renderCartBadge($badge: JQuery, result: CartQuantityResult): void {
    console.log('🚀 ~ renderCartBadge ~ result:', result);
    switch (result.status) {
    case 'ok':
        $badge.text(result.quantity).toggleClass('countPill--positive', true);
        break;
    case 'empty':
        $badge.text('').toggleClass('countPill--positive', false);
        break;
    case 'error':
        console.error(`Cart quantity lookup failed: ${result.message}`);
        break;
    default: {
        const exhaustive: never = result;
        throw new Error(`Unhandled result: ${exhaustive}`);
    }
    }
}

export default async function initCartBadge(options: CartQuantityOptions, selector = '.cart-quantity'): Promise<void> {
    const $badge = $(selector);
    console.log('🚀 ~ initCartBadge ~ $badge:', $badge);
    if (!$badge.length) return;

    renderCartBadge($badge, await fetchCartQuantity(options));
}
