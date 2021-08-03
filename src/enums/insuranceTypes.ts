import { BaseRepository } from '@/repositories/baseRepository'
import { EventRepository } from '@/repositories/insurances/eventRepository'
import { MaterialInsuranceRepository } from '@/repositories/insurances/materialInsuranceRepository'
import { NonMemberInsuranceRepository } from '@/repositories/insurances/nonMemberInsuranceRepository'
import { OneTimeActivityRepository } from '@/repositories/insurances/oneTimeActivityRepository'
import { TemporaryVehicleRepository } from '@/repositories/insurances/temporaryVehicleRepository'
import { TravelAssistanceRepository } from '@/repositories/insurances/travelAssistanceRepository'

export enum InsuranceTypes {
  EENMALIGE_ACTIVITEIT = 'EENMALIGE_ACTIVITEIT',
  TIJDELIJKE_VERZEKERING_NIET_LEDEN = 'TIJDELIJKE_VERZEKERING_NIET_LEDEN',
  REIS_BIJSTAND = 'REIS_BIJSTAND',
  TIJDELIJKE_AUTO_VERZEKERING = 'TIJDELIJKE_AUTO_VERZEKERING',
  EVENEMENTEN_VERZEKERING = 'EVENEMENTEN_VERZEKERING',
  MATERIAAL_VERZEKERING = 'MATERIAAL_VERZEKERING',
}

export const InsuranceTypeStoreNames: Record<InsuranceTypes, string> = {
  EENMALIGE_ACTIVITEIT: 'oneTimeActivityState',
  TIJDELIJKE_VERZEKERING_NIET_LEDEN: 'nonMemberState',
  REIS_BIJSTAND: 'travelAssistanceState',
  TIJDELIJKE_AUTO_VERZEKERING: 'temporaryVehicleState',
  EVENEMENTEN_VERZEKERING: 'eventState',
  MATERIAAL_VERZEKERING: 'materialInsuranceState',
}

export const InsuranceTypeStoreSetters: Record<InsuranceTypes, string> = {
  EENMALIGE_ACTIVITEIT: 'setOneTimeActivityState',
  TIJDELIJKE_VERZEKERING_NIET_LEDEN: 'setNonMemberState',
  REIS_BIJSTAND: 'setTravelAssistanceState',
  TIJDELIJKE_AUTO_VERZEKERING: 'setTemporaryVehicleState',
  EVENEMENTEN_VERZEKERING: 'setEventState',
  MATERIAAL_VERZEKERING: 'setMaterialInsuranceState',
}

export const InsuranceTypeRepos: Record<InsuranceTypes, new (...params: any[]) => BaseRepository> = {
  EENMALIGE_ACTIVITEIT: OneTimeActivityRepository,
  TIJDELIJKE_VERZEKERING_NIET_LEDEN: NonMemberInsuranceRepository,
  REIS_BIJSTAND: TravelAssistanceRepository,
  TIJDELIJKE_AUTO_VERZEKERING: TemporaryVehicleRepository,
  EVENEMENTEN_VERZEKERING: EventRepository,
  MATERIAAL_VERZEKERING: MaterialInsuranceRepository,
}

export const InsuranceTypeId: Record<InsuranceTypes, string> = {
  EENMALIGE_ACTIVITEIT: '1',
  TIJDELIJKE_VERZEKERING_NIET_LEDEN: '2',
  REIS_BIJSTAND: '3',
  TIJDELIJKE_AUTO_VERZEKERING: '5',
  EVENEMENTEN_VERZEKERING: '10',
  MATERIAAL_VERZEKERING: '6',
}

export const InsuranceTypeDateDisclaimer: Record<InsuranceTypes, string> = {
  EENMALIGE_ACTIVITEIT: 'Maximum 5 dagen',
  TIJDELIJKE_VERZEKERING_NIET_LEDEN: 'Maximum 1 maand',
  REIS_BIJSTAND: 'Maximum 1 maand',
  TIJDELIJKE_AUTO_VERZEKERING: 'Maximum 1 maand',
  EVENEMENTEN_VERZEKERING: '',
  MATERIAAL_VERZEKERING: 'Maximum 1 maand',
}
