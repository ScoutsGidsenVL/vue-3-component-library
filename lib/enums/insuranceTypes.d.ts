import { BaseRepository } from '@/repositories/baseRepository';
export declare enum InsuranceTypes {
    EENMALIGE_ACTIVITEIT = "EENMALIGE_ACTIVITEIT",
    TIJDELIJKE_VERZEKERING_NIET_LEDEN = "TIJDELIJKE_VERZEKERING_NIET_LEDEN",
    REIS_BIJSTAND = "REIS_BIJSTAND",
    TIJDELIJKE_AUTO_VERZEKERING = "TIJDELIJKE_AUTO_VERZEKERING",
    EVENEMENTEN_VERZEKERING = "EVENEMENTEN_VERZEKERING",
    MATERIAAL_VERZEKERING = "MATERIAAL_VERZEKERING"
}
export declare const InsuranceTypeStoreNames: Record<InsuranceTypes, string>;
export declare const InsuranceTypeStoreSetters: Record<InsuranceTypes, string>;
export declare const InsuranceTypeRepos: Record<InsuranceTypes, new (...params: any[]) => BaseRepository>;
export declare const InsuranceTypeId: Record<InsuranceTypes, string>;
export declare const InsuranceTypeDateDisclaimer: Record<InsuranceTypes, string>;
