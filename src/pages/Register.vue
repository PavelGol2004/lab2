<script setup>
import { useForm, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { toast } from 'vue-sonner'
import Header from '@/components/Header.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'

const registerSchema = toTypedSchema(
  z
    .object({
      lastName: z.string().trim().min(1, 'Фамилия обязательна').max(100),
      firstName: z.string().trim().min(1, 'Имя обязательно').max(100),
      middleName: z.string().trim().max(100).optional().or(z.literal('')),
      email: z.string().trim().email('Введите корректный email').max(255),
      password: z.string().min(6, 'Минимум 6 символов').max(128),
      confirmPassword: z.string().min(1, 'Подтвердите пароль'),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
    })
)

const { handleSubmit, errors } = useForm({
  validationSchema: registerSchema,
  initialValues: {
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
})

const onSubmit = handleSubmit((values) => {
  toast.success('Регистрация успешна (демо)', {
    description: `${values.lastName} ${values.firstName}`,
  })
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <Header />
    <div class="flex items-center justify-center px-4 py-12">
      <Card class="w-full max-w-md shadow-lg">
        <CardHeader class="text-center">
          <CardTitle class="text-2xl">Регистрация</CardTitle>
          <CardDescription>Создайте аккаунт SmartEvent</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="onSubmit" class="space-y-4">
            <div class="space-y-1">
              <Label>Фамилия</Label>
              <Field name="lastName" v-slot="{ field }">
                <Input v-bind="field" placeholder="Иванов" />
              </Field>
              <p v-if="errors.lastName" class="text-sm text-destructive">{{ errors.lastName }}</p>
            </div>

            <div class="space-y-1">
              <Label>Имя</Label>
              <Field name="firstName" v-slot="{ field }">
                <Input v-bind="field" placeholder="Иван" />
              </Field>
              <p v-if="errors.firstName" class="text-sm text-destructive">{{ errors.firstName }}</p>
            </div>

            <div class="space-y-1">
              <Label>
                Отчество
                <span class="font-normal text-muted-foreground">(необязательно)</span>
              </Label>
              <Field name="middleName" v-slot="{ field }">
                <Input v-bind="field" placeholder="Иванович" />
              </Field>
              <p v-if="errors.middleName" class="text-sm text-destructive">{{ errors.middleName }}</p>
            </div>

            <div class="space-y-1">
              <Label>Электронная почта</Label>
              <Field name="email" v-slot="{ field }">
                <Input v-bind="field" placeholder="example@mail.ru" type="email" />
              </Field>
              <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
            </div>

            <div class="space-y-1">
              <Label>Пароль</Label>
              <Field name="password" v-slot="{ field }">
                <Input v-bind="field" placeholder="Минимум 6 символов" type="password" />
              </Field>
              <p v-if="errors.password" class="text-sm text-destructive">{{ errors.password }}</p>
            </div>

            <div class="space-y-1">
              <Label>Подтверждение пароля</Label>
              <Field name="confirmPassword" v-slot="{ field }">
                <Input v-bind="field" placeholder="Повторите пароль" type="password" />
              </Field>
              <p v-if="errors.confirmPassword" class="text-sm text-destructive">{{ errors.confirmPassword }}</p>
            </div>

            <Button
              type="submit"
              class="w-full bg-[hsl(210,100%,50%)] hover:bg-[hsl(210,100%,40%)] text-white"
            >
              Зарегистрироваться
            </Button>
          </form>

          <p class="mt-4 text-center text-sm text-muted-foreground">
            Уже есть аккаунт?
            <RouterLink
              to="/login"
              class="font-medium text-[hsl(210,100%,50%)] hover:underline"
            >
              Войти
            </RouterLink>
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
