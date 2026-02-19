/* TIMES10.C
 * Multiplies a currency value by 10 and displays result.
 * Target: Turbo C 2.01 for DOS, Tiny model (.COM file)
 *
 * Usage: TIMES10 <amount>
 *   e.g. TIMES10 12.50    ->  $125.00
 *   e.g. TIMES10 $3.75    ->  $37.50
 *   e.g. TIMES10 100      ->  $1000.00
 *
 * Uses integer arithmetic (cents) to avoid floating-point
 * library, keeping the .COM file small and reliable.
 */

#include <stdio.h>

int main(argc, argv)
int argc;
char *argv[];
{
    char *p;
    long dollars = 0L;
    long cents = 0L;
    long total, result;

    if (argc < 2) {
        printf("Usage: TIMES10 <amount>\n");
        printf("  e.g. TIMES10 12.50\n");
        printf("  e.g. TIMES10 $12.50\n");
        return 1;
    }

    p = argv[1];

    /* Skip optional leading dollar sign */
    if (*p == '$')
        p++;

    /* Parse whole dollar amount */
    while (*p >= '0' && *p <= '9') {
        dollars = dollars * 10L + (long)(*p - '0');
        p++;
    }

    /* Parse cents after decimal point (up to 2 digits) */
    if (*p == '.') {
        p++;
        if (*p >= '0' && *p <= '9') {
            cents = (long)(*p - '0') * 10L;
            p++;
        }
        if (*p >= '0' && *p <= '9') {
            cents += (long)(*p - '0');
        }
    }

    /* Convert to cents, multiply by 10, display result */
    total = dollars * 100L + cents;
    result = total * 10L;

    printf("$%ld.%02ld\n", result / 100L, result % 100L);

    return 0;
}
