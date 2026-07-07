// src/App.tsx
import { useState } from 'react'

// MODULE 1 COMPONENTS
import WelcomeBanner       from './components/WelcomeBanner'
import UserGreeting        from './components/UserGreeting'
import CurrentDateDisplay  from './components/CurrentDateDisplay'
import ColoredBox          from './components/ColoredBox'
import ConditionalGreeting from './components/ConditionalGreeting'
import FruitList           from './components/FruitList'
import PriceTag            from './components/PriceTag'
import StatusBadge         from './components/StatusBadge'
import MiniProfileCard     from './components/MiniProfileCard'
import SimpleInfoTable     from './components/SimpleInfoTable'
import ProductCard         from './components/ProductCard'
import ProductCatalogList  from './components/ProductCatalogList'
import UserProfileCard     from './components/UserProfileCard'

// MODULE 1 EXERCISES
import TemperatureDisplay  from './components/TemperatureDisplay'
import ProgressBar         from './components/ProgressBar'
import BusinessCard        from './components/BusinessCard'
import RatingStars         from './components/RatingStars'
import TagList             from './components/TagList'

// MODULE 2 COMPONENTS (STATE)
import DigitalCounter      from './components/DigitalCounter'
import SafeCounter         from './components/SafeCounter'
import UserProfileForm     from './components/UserProfileForm'
import TaskManager         from './components/TaskManager'
import CatalogProductItem  from './components/CatalogProductItem'
import ShoppingCartSummary, { CartItem } from './components/ShoppingCartSummary'

// MODULE 3 COMPONENTS (EFFECTS)
import DocumentTitle    from './components/DocumentTitle'
import OnlineStatus     from './components/OnlineStatus'
import WindowSize       from './components/WindowSize'
import LiveClock        from './components/LiveClock'
import SearchWithEffect from './components/SearchWithEffect'
import DebounceSearch   from './components/DebounceSearch'
import FetchUser        from './components/FetchUser'
import AutoFocusInput   from './components/AutoFocusInput'

const fruits = [
  { name: 'Manzana', emoji: '🍎', calories: 52 },
  { name: 'Banana',  emoji: '🍌', calories: 89, inSeason: true },
  { name: 'Naranja', emoji: '🍊', calories: 47 },
  { name: 'Kiwi',    emoji: '🥝', calories: 61, inSeason: true },
]

const catalog = [
  { id: 1, name: 'Teclado mecánico',  price: 89.99, category: 'Periféricos' },
  { id: 2, name: 'Monitor 27 pulgadas', price: 349.99, category: 'Monitores' },
  { id: 3, name: 'Mouse inalámbrico', price: 29.99, outOfStock: false, category: 'Periféricos' },
  { id: 4, name: 'Webcam HD',         price: 59.99, category: 'Accesorios' },
  { id: 5, name: 'Hub USB-C',         price: 39.99, category: 'Accesorios' },
]

const storeCatalog = [
  { id: 1, name: 'Teclado mecánico',  price: 89.99 },
  { id: 2, name: 'Monitor 27"',       price: 349.99 },
  { id: 3, name: 'Mouse inalámbrico', price: 29.99 },
]

export default function App() {
  const [paso, setPaso] = useState<number>(1)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function handleAddToCart(id: number, name: string, price: number) {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { id, name, price, quantity: 1 }]
    })
  }

  function handleClearCart() {
    setCartItems([])
  }

  const renderContent = () => {
    switch (paso) {
      // --- MODULO 1 ---
      case 1:
        return <WelcomeBanner subtitle="Aprende React 19 con TypeScript y Gemini" />
      case 2:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <UserGreeting name="Carlos López Ruiz" occupation="DevOps Engineer" online={true} />
            <UserGreeting name="Luis Mora" />
          </div>
        )
      case 3:
        return <CurrentDateDisplay showTime={true} />
      case 4:
        return (
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <ColoredBox color="#f59e0b" width={120} height={40} label="Rectángulo" borderRadius={12} onClick={() => alert('Color: #f59e0b')} />
            <ColoredBox color="#8b5cf6" label="Cuadrado Violeta" borderRadius={20} onClick={() => alert('Color: #8b5cf6')} />
            <ColoredBox color="#ec4899" borderRadius={50} onClick={() => alert('Color: #ec4899')} />
          </div>
        )
      case 5:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ConditionalGreeting isLoggedIn={false} />
            <ConditionalGreeting isLoggedIn={true} userName="Carlos" timeOfDay="night" />
            <ConditionalGreeting isLoggedIn={true} userName="Ana" timeOfDay="afternoon" greeting="¡Qué bueno verte de nuevo!" />
          </div>
        )
      case 6:
        return <FruitList fruits={fruits} title="Frutas favoritas" />
      case 7:
        return (
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <PriceTag amount={120.00} currency="GBP" size="large" />
            <PriceTag amount={99.99} currency="EUR" discountPercent={50} size="medium" />
            <PriceTag amount={5.50} currency="USD" size="small" />
          </div>
        )
      case 8:
        return (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <StatusBadge status="active" icon="✅" />
            <StatusBadge status="pending" label="En revisión" icon="⏳" />
            <StatusBadge status="error" icon="❌" />
            <StatusBadge status="inactive" />
            <StatusBadge status="warning" label="Advertencia" icon="⚠️" />
          </div>
        )
      case 9:
        return (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <MiniProfileCard
              fullName="Ana García"
              role="Senior Developer"
              department="Ingeniería"
              status="error"
              joinedYear={2019}
              avatarColor="#ef4444"
            />
            <MiniProfileCard
              fullName="Luis Mora"
              role="Product Designer"
              status="active"
              joinedYear={new Date().getFullYear()}
              avatarColor="#10b981"
            />
          </div>
        )
      case 10:
        return (
          <SimpleInfoTable
            title="Detalle de costos"
            striped={true}
            rows={[
              { label: 'Subtotal',  value: '$89.99' },
              { label: 'Envío',     value: '$5.00' },
              { label: 'IVA',       value: '$15.20' },
              { label: 'Descuento', value: 0 },
              { label: 'Total',     value: '$110.19', highlight: false },
            ]}
          />
        )
      case 11:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ProductCard
              title="Bienvenido a la tienda"
              description="Encuentra los mejores accesorios para tu escritorio"
              highlighted={false}
              price={120.00}
              onClick={() => alert('¡Click en la tarjeta!')}
            />
            <ProductCard
              title="Oferta del día"
              description=""
              price={49.99}
            />
          </div>
        )
      case 12:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <ProductCatalogList products={catalog} title="Productos disponibles" />
            <ProductCatalogList products={[]} title="Catálogo sin existencias" />
          </div>
        )
      case 13:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <UserProfileCard
              fullName="Ana García"
              email="ana@ejemplo.com"
              role="admin"
              isActive={false}
              skills={['TypeScript', 'React', 'Node.js', 'GraphQL']}
              bio="Desarrolladora fullstack con 5 años de experiencia."
              avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
            />
            <UserProfileCard
              fullName="Luis Mora"
              email="luis@ejemplo.com"
              role="viewer"
              isActive={false}
              skills={['Figma', 'CSS']}
              bio="Diseñador con experiencia en sistemas UI"
            />
          </div>
        )

      // --- MODULO 1 EJERCICIOS ---
      case 14:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TemperatureDisplay celsius={32} />
            <TemperatureDisplay celsius={22} />
            <TemperatureDisplay celsius={12} />
          </div>
        )
      case 15:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <ProgressBar percent={35} color="#3b82f6" />
            <ProgressBar percent={80} color="#10b981" />
            <ProgressBar percent={120} color="#ef4444" />
          </div>
        )
      case 16:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <BusinessCard
              name="Juan Pérez"
              email="juan.perez@example.com"
              phone="+34 600 000 000"
              website="juanperez.dev"
            />
            <BusinessCard
              name="María Gómez"
              email="maria.gomez@example.com"
            />
          </div>
        )
      case 17:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <RatingStars rating={4.3} />
            <RatingStars rating={2.7} maxStars={5} />
            <RatingStars rating={8.5} maxStars={10} />
          </div>
        )
      case 18:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TagList tags={['React', 'TypeScript', 'WebDev']} color="#2563eb" />
            <TagList tags={['Design', 'UX']} color="#db2777" />
            <TagList tags={[]} color="#10b981" />
          </div>
        )

      // --- MODULO 2 (STATE) ---
      case 19:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <DigitalCounter label="Temperatura (°C)" step={5} initialValue={10} min={0} max={20} />
            <DigitalCounter label="Contador Normal" step={1} />
            <DigitalCounter label="Valores Decimales" step={0.5} initialValue={2.5} min={0} max={10} />
          </div>
        )
      case 20:
        return <SafeCounter />
      case 21:
        return <UserProfileForm />
      case 22:
        return <TaskManager />
      case 23:
        return (
          <div style={{ maxWidth: 400 }}>
            <h2 style={{ fontSize: 20, color: '#111827', margin: '0 0 16px 0', fontWeight: 600 }}>Tienda</h2>
            <section style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {storeCatalog.map((p) => (
                <CatalogProductItem
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </section>
            <ShoppingCartSummary items={cartItems} onClearCart={handleClearCart} />
          </div>
        )

      // --- MODULO 3 (EFFECTS) ---
      case 24:
        return <DocumentTitle />
      case 25:
        return <OnlineStatus />
      case 26:
        return <WindowSize />
      case 27:
        return <LiveClock />
      case 28:
        return <SearchWithEffect />
      case 29:
        return <DebounceSearch />
      case 30:
        return <FetchUser />
      case 31:
        return <AutoFocusInput />

      default:
        return <p style={{ color: '#e00' }}>Paso no configurado</p>
    }
  }

  return (
    <main style={{ maxWidth: 640, margin: '40px auto', fontFamily: 'sans-serif', padding: '0 16px' }}>
      <header
        style={{
          marginBottom: 24,
          paddingBottom: 20,
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div>
          <h2 style={{ margin: 0, color: '#111827', fontSize: 22, fontWeight: 700 }}>
            Navegador Unificado de Componentes
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#6b7280' }}>
            Selecciona un componente o ejercicio para probarlo interactivamente en tiempo real.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#4b5563' }}>Componente Actual:</label>
          <select
            value={paso}
            onChange={(e) => setPaso(Number(e.target.value))}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              fontSize: 14,
              backgroundColor: '#f9fafb',
              fontWeight: 600,
              color: '#1f2937',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <optgroup label="Módulo 1: Componentes Básicos (Sin Hooks)">
              <option value={1}>1. WelcomeBanner (Banner estático)</option>
              <option value={2}>2. UserGreeting (Avatar de iniciales)</option>
              <option value={3}>3. CurrentDateDisplay (Fecha formateada)</option>
              <option value={4}>4. ColoredBox (Cajas de color dinámicas)</option>
              <option value={5}>5. ConditionalGreeting (Saludos según hora)</option>
              <option value={6}>6. FruitList (Listas de frutas con calorías)</option>
              <option value={7}>7. PriceTag (Etiquetas de precio con descuento)</option>
              <option value={8}>8. StatusBadge (Insignias de estado)</option>
              <option value={9}>9. MiniProfileCard (Composición de perfil)</option>
              <option value={10}>10. SimpleInfoTable (Tablas tabuladas)</option>
              <option value={11}>11. ProductCard (Tarjetas de producto con precio)</option>
              <option value={12}>12. ProductCatalogList (Catálogo de stock)</option>
              <option value={13}>13. UserProfileCard (Perfil con habilidades y roles)</option>
            </optgroup>
            <optgroup label="Módulo 1: Ejercicios Propuestos">
              <option value={14}>14. TemperatureDisplay (Conversión de Celsius)</option>
              <option value={15}>15. ProgressBar (Barra de progreso)</option>
              <option value={16}>16. BusinessCard (Tarjeta de presentación)</option>
              <option value={17}>17. RatingStars (Valoración con estrellas)</option>
              <option value={18}>18. TagList (Listado de etiquetas)</option>
            </optgroup>
            <optgroup label="Módulo 2: Estado (useState)">
              <option value={19}>19. DigitalCounter (Contador digital limitado)</option>
              <option value={20}>20. SafeCounter (Actualizaciones seguras prev =&gt; ...)</option>
              <option value={21}>21. UserProfileForm (Estado de objeto + Spread)</option>
              <option value={22}>22. TaskManager (Estado de array + Filtros)</option>
              <option value={23}>23. Tienda Carrito (Carrito funcional + Cantidades)</option>
            </optgroup>
            <optgroup label="Módulo 3: Ciclo de vida y efectos (useEffect)">
              <option value={24}>24. DocumentTitle (Sincronización del título)</option>
              <option value={25}>25. OnlineStatus (Suscripción a red y visibilidad)</option>
              <option value={26}>26. WindowSize (Suscripción a resize con throttle)</option>
              <option value={27}>27. LiveClock (Temporizador con setInterval)</option>
              <option value={28}>28. SearchWithEffect (Búsqueda reactiva)</option>
              <option value={29}>29. DebounceSearch (Debounce de consultas)</option>
              <option value={30}>30. FetchUser (Petición HTTP real y cancelación)</option>
              <option value={31}>31. AutoFocusInput (Refs al DOM imperativo)</option>
            </optgroup>
          </select>
        </div>
      </header>

      <section style={{ minHeight: 300, display: 'flex', alignItems: 'flex-start', justifyContent: 'stretch' }}>
        {renderContent()}
      </section>
    </main>
  )
}
